const express = require('express')
	, router = express.Router()
	, info  = require('../configs/info.json')
	, commands = require('../configs/commands.json')
	, faq = require('../configs/faq.json')
	, passport = require('passport')
	, config  = require('../configs/main.json')
	, Stats = require('../stats.js')
	, Mongo = require('../mongo.js');

module.exports = () => {

	router.get('/', (req, res) => {
		res.render('homepage', {
			configs: info,
			stats: Stats.tombot
		});
	});

	router.get('/commands', (req, res) => {
		res.render('commands', {
			configs: info,
			commands: commands,
		});
	});

	router.get('/faq', (req, res) => {
		res.render('faq', {
			configs: info,
			faq: faq,
		});
	});

	router.get('/vip', (req, res) => {
		res.render('vip', {
			configs: info,
		});
	});

	router.get('/stats', (req, res) => {
		res.redirect('https://p.datadoghq.com/sb/221cba9d3-8368e8b79ae187e8d98e0b18cb036402?tv_mode=true')
	});

	router.get('/vote', (req, res) => {
		res.redirect(info.voteURL);
	});

	router.get('/win', (req, res) => {
		res.redirect(info.supportURL);
	});

	router.get('/support', (req, res) => {
		res.redirect(info.supportURL);
	});

	router.get('/discord', (req, res) => {
		res.redirect(info.supportURL);
	});

	router.get('/invite', (req, res) => {
		res.redirect(info.inviteURL);
	});

	router.get('/github', (req, res) => {
		res.redirect(info.githubURL);
	});

	router.get('/robots.txt', (req, res) => {
		res.type('text/plain');
		res.send('User-agent: *\nDisallow:');
	});

	router.get('*', (req, res) => {
		res.status(404).render('404', {
			configs: info,
		});
	});

	return router;

}
