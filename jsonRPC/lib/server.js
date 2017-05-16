var http = require('http');
var util = require('util');
var url = require('url');
var EventEmitter = require('events');
var config = require('./config.js');
var code = require('./code.js');
var expose = {};
var server;

var PServer = function () { }
util.inherits(PServer, EventEmitter);
var pServer = new PServer();


PServer.prototype.expose = function (api, impl) {
    if (typeof api != 'string') throw (api + ' argments should be string');
    expose[api] = impl;
}

PServer.prototype.listen = function (port) {
    port = port || config.port;
    server = http.createServer(function (req, res) {
        if (req.method.toUpperCase() == 'POST') {
            var postData = "";
            req.addListener("data", function (data) {
                postData += data;
            });
            req.addListener("end", function () {
                pServer.emit('valid', res, JSON.parse(postData));
            });
        }
        else if (req.method.toUpperCase() == 'GET') {
            var query = url.parse(req.url, true).query;
            pServer.emit('valid', res, query);
        }
    }).listen(port);
}

PServer.prototype.close = function () {
    if (server) {
        server.close();
        server = null;
    }
}

function wrap(arg) {
    var response = {};
    response.jsonrpc = '2.0';
    response.id = arg.id;
    if (arg.error) {
        response.error = arg.error;
    } else {
        response.result = arg.result;
    }
    return response;
}

pServer.on('valid', function (res, arg) {
    if (arg.jsonrpc && arg.method && arg.params && arg.id) {
        if (typeof arg.method != 'string' || typeof arg.params != 'object') {
            arg.error = code.InvalidParams;
            return pServer.emit('end', res, wrap(arg));
        }
        pServer.emit('run', res, arg);
    } else {
        arg.error = code.InvalidRequest;
        return pServer.emit('end', res, wrap(arg));
    }
});

pServer.on('run', function (res, arg) {
    var fun = eval('expose.' + arg.method);
    if (typeof fun != 'function') {
        arg.error = code.MethodNotFound;
        return pServer.emit('end', res, wrap(arg));
    }
    arg.result = fun.apply(this, arg);
    return pServer.emit('end', res, wrap(arg));
});

pServer.on('end', function (res, arg) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(wrap(arg)));
    res.end();
});

module.exports = pServer;