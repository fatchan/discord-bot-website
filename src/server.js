'use strict';

const path     = require('path')
	, helmet = require('helmet')
	, config  = require('./configs/main.json')
	, cookieParser = require('cookie-parser')

module.exports = (app) => {

	//setup middlewares
	app.set('view engine', 'pug');
	app.set('views', path.join(__dirname, 'views'));
	app.use(cookieParser());
	app.use(helmet({
		//allow for discord bot listing sites
		frameguard: false
	}))

	//setup routes
	const pages = require('./routes/pages.js')();
	const webhooks = require('./routes/webhooks.js')();
	app.use('/', webhooks);
	app.use('/', pages);

}
