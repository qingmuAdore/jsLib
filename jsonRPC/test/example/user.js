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

module.exports = new user();