var socket = io({ transports: ['websocket'] });
socket.on('stats', function(data) {
	updatechart(data);
});

function updatechart(data) {
	var guilds = document.getElementById('stats-guilds')
	if (guilds && guilds.textContent != data.guilds) {
		guilds.textContent = data.guilds.toLocaleString();
	}
	var users = document.getElementById('stats-users')
	if (users && users.textContent != data.users) {
		users.textContent = data.users.toLocaleString();
	}
	var streams = document.getElementById('stats-streams')
	if (streams && streams.textContent != data.totalVoiceConnections) {
		streams.textContent = data.totalVoiceConnections.toLocaleString();
	}
}
