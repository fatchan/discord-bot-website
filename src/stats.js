'use strict';

const Mongo = require('./mongo.js')
	, config  = require('./configs/main.json')

module.exports = {

	start: async() => {
		if (module.exports.db) {
			throw new Error('Stats already started');
		}
		module.exports.db = Mongo.client.db(config.statsdbName).collection('stats');
		module.exports.tombot = await module.exports.db.findOne({_id:'stats'}).then(v => v.value.tombot);
	}

}
