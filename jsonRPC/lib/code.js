function cm(code, msg) {
    return {
        code: code,
        message: msg,
    }
}


module.exports = {
    ParseError: cm(-32700, 'Parse error'),
    InvalidRequest: cm(-32600, 'Invalid Request'),
    MethodNotFound: cm(-32601, 'Method not found'),
    InvalidParams: cm(-32602, 'Invalid params'),
    InnerError: cm(-32603, 'Inner error')
}