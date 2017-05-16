/**
 * Created by YS on 2017-04-17.
 */
var express = require('express');
var router = express.Router();
var proxy = require('proxy-express');
var ip = require('../lantern-ip');

module.exports = function(){

	// User registration
	router.all('/api/*', proxy(ip.query, {
		pre : function (proxyObj, callback) {
			if (proxyObj.req.headers['content-type'] == "application/json") {
				proxyObj.reqOpts.headers['content-length'] = JSON.stringify(proxyObj.req.body).length;
				proxyObj.reqOpts.json = proxyObj.req.body;
				proxyObj.req.body = undefined;
			}

			return callback();
		}
	}));        // 데이터 업로드

	// catch 404 and forward to error handler
	router.all('/*', proxy(ip.web, {
		pre : function (proxyObj, callback) {
			if (proxyObj.req.headers['content-type'] == "application/json") {
				proxyObj.reqOpts.headers['content-length'] = JSON.stringify(proxyObj.req.body).length;
				proxyObj.reqOpts.json = proxyObj.req.body;
				proxyObj.req.body = undefined;
			}

			return callback();
		}
	}));

	return router;
};

