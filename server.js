#!/bin/env node
//  OpenShift sample Node application
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var fs      = require('fs');

var app = express();
//app.set('port', process.env.OPENSHIFT_NODEJS_PORT || 8080);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', routes.index);
app.get('/users', user.list);


var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

http.createServer(app).listen(server_port, server_ip_address, function () {
    console.log('Express server listening on port ' + app.get('port'));
});

