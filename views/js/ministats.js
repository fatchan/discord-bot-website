	var socket = io({ transports: ['websocket'] });
	socket.on('stats', function(data) {
		updatechart(data);
	});
	var updatechart = function(data) {
		if (data.guilds != $('#stats-guilds').text()) {
			$('#stats-guilds').text(data.guilds);
		}
		if (data.users != $('#stats-users').text()) {
			$('#stats-users').text(data.users);
		}
		if (data.totalVoiceConnections != $('#stats-streams').text()) {
			$('#stats-streams').text(data.totalVoiceConnections);
		}
	};
