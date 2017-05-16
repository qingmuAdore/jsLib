var method = 'user.login';

function user() {

}

user.prototype.login = function (name, password) {
    return {
        id: 'userId',
        token: 'loginToken',
        name: name,
        password: password,
    }
}


var expose = {
    user: new user(),
}

function run(method, args) {
    var arr = method.split('.');
    var fun = eval('expose.' + method);
    if (typeof fun === 'function');
    return fun.apply(this, args);
}



// var res = expose['user']['login'].apply(this, ['pauly', '123456']);
// var res = eval('expose.' + method).apply(this, ['pauly', '123456']);

var res = run(method, ['pauly', '123456']);

console.log(res);