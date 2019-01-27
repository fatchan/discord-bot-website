# discord-bot-website

A discord bot website that I use for tombot. Live example at https://69420.me/

### Features

- Webhook live stats on homepage for users, guilds and voice connections
- Nice layout for commands in categories
- Dark and light theme
- Handles webhooks from discordbots.org votes and donatebot.io donations

### Requirements

- NodeJS >=8 for async/await
- MongoDB >=3.6 for changestreams (live stats update on homepage using webhooks)
- guilds, users and voice connections stats in mongodb

### Notes

There are a few things that need to be changed:
  1. tombot references in the views, specifically the header
  2. Some database stuff e.g. votes, points, donations is specialised to tombot so you would need to implement the same format in your bot.
