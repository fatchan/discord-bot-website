'use strict';

const { MongoClient } = require('mongodb')
	, config  = require('./configs/main.json')

module.exports = {

	connect: async() => {
		if (module.exports.client) {
			throw new Error('Mongo already connected');
		}
		module.exports.client = await MongoClient.connect(config.dbURL, { useNewUrlParser: true });
	}

}
