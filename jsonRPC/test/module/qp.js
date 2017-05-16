var request = {
    jsonrpc: '2.0',
    method: '',
    params: [], // array|object
    id: 0
}

var response = { //result,error 择一
    jsonrpc: '2.0',
    result: null,
    error: {
        code: 0,
        meesage: '',
        data: null,//非必须
    },
    id: 0
}