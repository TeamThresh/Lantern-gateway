/**
 * Created by YS on 2017-04-17.
 */
var express = require('express');
var router = express.Router();
var ip = require('./lantern-ip');

module.exports = function(){

  // User registration
  router.all('/api/*', proxy(ip.query, '/'));        // 데이터 업로드

  // catch 404 and forward to error handler
  router.all('/*', proxy(ip.web, '/'));

  return router;
};

