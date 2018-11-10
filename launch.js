'use strict';

process.on('uncaughtException', console.error);
process.on('unhandledRejection', console.error);

const express = require('express')
	, { MongoClient } = require('mongodb')
	, config  = require('./configs/main.json')

async function launch() {
	const client = await MongoClient.connect(config.dbURL, { useNewUrlParser: true });
	const app = express();
	const server = require('http').createServer(app);
	const website = require('./server.js')(app, client, config);
	const websocket = require('./websocket.js');
	await websocket.start(server, client, config);
	server.listen(config.port, () => {
        console.log('Listening on port '+config.port);
    });
}

try {
	launch();
} catch(e) {
	console.error(e);
	process.exit(1);
}
