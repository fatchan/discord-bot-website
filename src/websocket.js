const socketio = require('socket.io')
	, stats = require('./stats.js')
	, config  = require('./configs/main.json')
	, Stats = require('./stats.js')
	, Mongo = require('./mongo.js')

module.exports = (server) => {
	
	const io = socketio(server, { transports: ['websocket'] })
	
	io.on('connection', (socket) => {
		socket.emit('statstart', Stats.tombot);
	});
	
	const changeStream = Stats.db.watch();
	
	changeStream.on("change", (change) => {
		if (change.operationType === 'update') {
			for(let update in change.updateDescription.updatedFields) {
				if (update === 'value.tombot') {
					const newstats = change.updateDescription.updatedFields['value.tombot'];
					Stats.tombot = newstats;
					io.emit('stats', Stats.tombot);
				}
			}
		}
	});
	
}

