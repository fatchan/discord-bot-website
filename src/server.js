'use strict';

const path = require('path')
	, helmet = require('helmet')
	, config  = require('./configs/main.json')
	, bodyParser = require('body-parser');

module.exports = (app) => {

	//setup middlewares
	app.set('view engine', 'pug');
	app.set('views', path.join(__dirname, 'views/pages'));
	app.enable('view cache')
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
		extended: false
	}))
	app.use(helmet({
		//allow for discord bot listing sites
		frameguard: false
	}))

	//app.use(require('express').static(__dirname+'/../dist'));

	//setup routes
	const pages = require('./routes/pages.js')();
	const webhooks = require('./routes/webhooks.js')();
	app.use('/', webhooks);
	app.use('/', pages);

}
