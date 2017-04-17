var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var proxy = require('proxy-express');
var subdomain = require('express-subdomain');

var router = require('./routes');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

var ip = require('./lantern-ip');

app.use(subdomain('lantern', router));
app.use(subdomain('query', proxy(ip.query, '/')));
app.use(proxy(ip.landingPage, '/'));

module.exports = app;
