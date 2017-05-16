var server = require('../../lib/server.js');
var user = require('./user.js');

server.expose('user', user);
server.expose('show', function () {
    return {
        fun: 'show',
        msg: 'show msg'
    }
})



server.listen(8080);

