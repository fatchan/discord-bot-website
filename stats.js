const Mongo = require('./mongo.js')
	, config  = require('./configs/main.json')

module.exports = {
	
	db: null,
	
	tombot: null,
	
	getDB: () => {
		return this.db;
	},
	
	getStats: () => {
		return this.tombot;
	},
	
	setStats: (stats) => {
		this.tombot = stats;
	},
	
	start: async() => {
		if (this.db) {
			throw new Error('Stats already started');
		} 
	    this.db = Mongo.getClient().db(config.statsdbName).collection('stats');
		this.tombot = await this.db.findOne({_id:'stats'}).then(v => v.value.tombot);
	}
	
}