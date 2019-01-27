'use strict';

const session  = require('express-session')
	, MongoStore = require('connect-mongo')(session)
	, passport = require('passport')
	, Strategy = require('passport-discord').Strategy
	, path     = require('path')
	, helmet = require('helmet')
	, csrf = require('csurf')
	, bodyParser = require('body-parser')
	, cookieParser = require('cookie-parser')
	, config  = require('./configs/main.json')
	, Mongo = require('./mongo.js');

module.exports = (app) => {

	//passport for discord
	passport.serializeUser((user, done) => {
		done(null, user);
	});
	passport.deserializeUser((obj, done) => {
		done(null, obj);
	});
	passport.use(new Strategy({
		clientID: config.passportClientID,
		clientSecret: config.passportClientSecret,
		callbackURL: config.passportCallbackURL,
		scope: ['identify', 'guilds']
	}, (accessToken, refreshToken, profile, done) => {
		process.nextTick(() => {
			return done(null, profile);
		});
	}));

	//setup middlewares
	app.set('view engine', 'pug');
	app.set('views', path.join(__dirname, 'views'));
	app.use(session({
		secret: config.sessionSecret,
		store: new MongoStore({ db: Mongo.client.db(config.sessionDbName) }),
		resave: false,
		saveUninitialized: false,
	}));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
		extended: false
	}))
	app.use(cookieParser());
	app.use(helmet({
		//allow for discord bot listing sites
		frameguard: false
	}))
	
	//setup routes
	const pages = require('./routes/pages.js')();
	const webhooks = require('./routes/webhooks.js')();
	app.use('/', webhooks);
	app.use(csrf())
	app.use('/', pages);

	app.use((err, req, res, next) => {
		if (err.code !== 'EBADCSRFTOKEN') { 
			console.error(err.stack);
			return res.status(500).send('Something broke!');
		}
		res.status(403);
		res.send('Forbidden'); //invalid csrf token
	})
	
}
