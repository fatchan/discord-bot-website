const { MongoClient } = require('mongodb')
	, config  = require('./configs/main.json')

module.exports = {

	client: null,
	
	getClient: () => {
		return this.client;
	},
	
	connect: async() => {
		if (this.client) {
			throw new Error('Mongo already connected');
		}
	    this.client = await MongoClient.connect(config.dbURL, { useNewUrlParser: true });
	}
	
}