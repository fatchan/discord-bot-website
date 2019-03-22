function setActiveStyleSheet(title) {
	$('link').each((i, elem) => {
		elem = $(elem);
	    if (elem.attr('rel').includes('style') && elem.attr('title')) {
			elem.prop('disabled', elem.attr('title') !== title);
	    }
	})
	$.cookie("style", title, { path: '/', expires: 7 });
}

function togglestyle() {
	const title = $.cookie("style");
	if(title === 'light') {
		setActiveStyleSheet('dark');
	} else {
		setActiveStyleSheet('light');
	}
}

$(document).ready(() => {

	$('#styleswitcher').click(() => {
		togglestyle();
	});

	$('.navbar-toggle').click(() => {
		$('.navbar').toggleClass('mobile-shown');
	});

});
