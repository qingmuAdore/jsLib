var http = require('http');
var url = require('url');
var querystring = require('querystring');
var user = require('./user.js');

var expose = {
    user: new user(),
}

/**
 * 
 * @param {string} method 
 * @param {array} args 
 * 
 * @return {object}
 */
function run(method, args) {
    var fun = eval('expose.' + method); // expose.user.login
    return fun.apply(this, args);
}

function wrap(data) {
    return {
        jsonrpc: '2.0',
        result: data,
        id: 0
    }
}


/**
 * 照样输出json格式的数据
 * @param query
 * @param res
 */
function writeOut(query, res) {
    var data = run(query.method, query.params);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(wrap(data)));
    res.end();
}


http.createServer(function (req, res) {
    if (req.method.toUpperCase() == 'POST') {
        var postData = "";
        /**
         * 因为post方式的数据不太一样可能很庞大复杂，
         * 所以要添加监听来获取传递的数据
         * 也可写作 req.on("data",function(data){});
         */
        req.addListener("data", function (data) {
            postData += data;
        });
        /**
         * 这个是如果数据读取完毕就会执行的监听方法
         */
        req.addListener("end", function () {
            writeOut(JSON.parse(postData), res);
        });
    }
    else if (req.method.toUpperCase() == 'GET') {
        var query = url.parse(req.url, true).query;
        writeOut(query, res);
    } else {
        //head put delete options etc.   
        var query = url.parse(req.url, true).query;
        writeOut(query, res);
    }
}).listen(8080);