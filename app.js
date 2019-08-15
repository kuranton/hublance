const express = require('express');
const bodyParser = require('body-parser');
const users_routes = require('./routes/users');
const path = require('path');

require('dotenv').config();

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', `${process.env.CORS_ORIGIN}`);
  res.setHeader('Access-Control-Allow-Methods', 'GET, SET, PUT, POST, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Origin');
  next();
});

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use(users_routes);



if (process.env.NODE_ENV !== 'test') {
  var server = app.listen(process.env.PORT | 8080);
}

module.exports.app = app;
module.exports.server = server;