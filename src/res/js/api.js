$( document ).ready(function() {
	//getting info for a server
	$('.sidebar-icon-radius').click(function() {
		var ID = $(this).attr('data-attribute');
		var token = $('#csrf').attr('value');  //use this for POSTS in other requests
		$.ajax({
			type: 'GET',
			url: '/api/guilds/'+ID,
			dataType: 'json',
			success: function (data) {
				$('.server-info').empty();
				if (!data) { return; }
				//console.log(data)
				var anydata = data.error ? data : data.settings
				$.each(Object.keys(anydata), function (i, item) {
					if(anydata[item]) {
		                var setting = ('<ul>' + item + ': ' + anydata[item] + '</ul>');
		                $('.server-info').append(setting);
					}
	            });
			}
		});
	});
});
