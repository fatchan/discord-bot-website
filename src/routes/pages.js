const express = require('express')
	, router = express.Router()
	, info  = require('../configs/info.json')
    , commands = require('../configs/commands.json')
    , faq = require('../configs/faq.json')
	, passport = require('passport')
	, config  = require('../configs/main.json')
	, Stats = require('../stats.js')
	, Mongo = require('../mongo.js');

module.exports = () => {

    router.get('/', (req, res) => {
        res.render('homepage', {
            cache: false,
            style: req.cookies.style || config.defaultStyle,
            configs: info,
            stats: Stats.tombot
        });
    });
	
    router.get('/commands', (req, res) => {
        res.render('commands', {
            cache: true,
            style: req.cookies.style || config.defaultStyle,
            user: req.user,
            configs: info,
            commands: commands,
        });
    });
	
    router.get('/stats', (req, res) => {
		res.redirect('https://p.datadoghq.com/sb/221cba9d3-d4cbc9ce9de358694de7dc7c2bc88838')
    });
	
    router.get('/faq', (req, res) => {
        res.render('faq', {
            cache: true,
            style: req.cookies.style || config.defaultStyle,
            configs: info,
            faq: faq,
        });
    });
	
    router.get('/vip', (req, res) => {
        res.render('vip', {
            cache: true,
            style: req.cookies.style || config.defaultStyle,
            configs: info,
        });
    });
	
    router.get('/vote', (req, res) => {
        res.redirect(info.voteURL);
    });
	
    router.get('/support', (req, res) => {
        res.redirect(info.supportURL);
    });
	
    router.get('/discord', (req, res) => {
        res.redirect(info.supportURL);
    });
	
    router.get('/invite', (req, res) => {
        res.redirect(info.inviteURL);
    });
	
    router.get('/github', (req, res) => {
        res.redirect(info.githubURL);
    });
	
    router.get('/robots.txt', (req, res) => {
        res.type('text/plain');
        res.send('User-agent: *\nDisallow:');
    });
	
    router.get('*', (req, res) => {
        res.status(404).render('404', {
            cache: true,
            style: req.cookies.style || config.defaultStyle,
            configs: info,
        });
    });

	return router;

}
