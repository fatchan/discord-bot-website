
const express = require('express')
	, router = express.Router()
	, websocket = require('../websocket.js')
	, passport = require('passport')
	, crypto = require('crypto')
	, fetch = require('node-fetch')
	, StatsD = require('node-dogstatsd').StatsD
	, dd = new StatsD()
	, config  = require('../configs/main.json')
	, Mongo = require('../mongo.js');

module.exports = function() {

	const votesDB = Mongo.client.db(config.statsdbName).collection('votes');
	const donateDB = Mongo.client.db(config.statsdbName).collection('donate');
	const blacklistDB = Mongo.client.db(config.statsdbName).collection('blacklist');
	const pointsDB = Mongo.client.db(config.statsdbName).collection('points');

	router.post('/donatebotwebhook', async (req, res) => {
console.log(req.body);
		const auth = req.headers['authorization'];
		if(!auth || auth !== config.donateSecret) {
			res.status(403).json({error:'Unauthorised'})
		}
		const donation = req.body;
		if (donation.status.toLowerCase() !== 'completed') {
//TODO: add chargeback blacklisting
			return res.status(200).json({success:true});
		}
		let tokens = 0;
		const price = +donation.price;
		if (price === 3.99) {
			tokens = 1;
		} else if (price === 8.99) {
			tokens = 3;
		} else if (price > 8.99) {
			tokens = Math.floor(price/2.99);
		}
		await donateDB.updateOne({
			'_id': donation.buyer_id
		}, {
			'$inc': {
				'tokens': tokens
			},
			'$push': {
				'transactions': {
					'txn_id': donation.txn_id,
					'email': donation.buyer_email,
					'tokens': tokens,
					'price': price,
					'status': donation.status,
					'guild_id': donation.guild_id,
					'role_id': donation.role_id,
					'buyer_id': donation.buyer_id
				}
			},
		}, {
			'upsert': true
		});
		return res.status(200).json({success:true});
	});

	router.post('/dblwebhook', (req, res) => {
		const auth = req.headers['authorization'];
		if(!auth) {
			res.status(403).json({error:'Unauthorised'});
		} else {
			if (auth == config.dblAuth) {
				const botdata = req.body;
				console.info('VOTE  | '+botdata.user);
				dd.increment('tombot.vote');
				votesDB.replaceOne({_id: botdata.user.toString()},{_id: botdata.user.toString(),value: true,expireAt: new Date((new Date).getTime() + (config.cacheHours*1000*60*60))},{upsert: true});
				pointsDB.updateOne({_id: botdata.user.toString()},{$inc:{votes: 1}});
				const body = {embeds: [{
					title: 'Upvote!',
					description: `Thank you <@!${botdata.user}> for supporting TomBot!`,
					footer: {text: new Date().toLocaleString()}
				}], username: 'TomBot'};
				fetch(`https://discordapp.com/api/webhooks/${config.webhookID}/${config.webhookToken}`, {
					method: 'POST',
					body: JSON.stringify(body),
					headers: { 'Content-Type': 'application/json' }
				});
				res.json({success:true});
			} else {
				res.status(403).json({error:'Unauthorised'});
			}
		}
	})

	return router;

}


