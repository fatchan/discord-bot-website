'use strict';

process.on('uncaughtException', console.error);
process.on('unhandledRejection', console.error);

const express = require('express')
	, config  = require('./configs/main.json')
	, app = express()
	, server = require('http').createServer(app)
	, Mongo = require('./mongo.js')
	, Stats = require('./stats.js');

(async () => {
	try {
		await Mongo.connect()
		await Stats.start()
	} catch(e) {
		console.error(e);
		process.exit(1);
	}
	const website = require('./server.js')(app);
	const websocket = require('./websocket.js')(server);
	server.listen(config.port, () => {
		console.log(`Listening on port ${config.port}`);
	});
})();


