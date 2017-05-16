function cf() {
    var args = Array.prototype.slice.call(arguments);
    console.log(args);
}

cf('one', 'two', 'three');

var arr = ['one', 'two', 'three'];
console.log(arr.slice()); //[ 'one', 'two', 'three' ]
console.log(arr.slice(0)); //[ 'one', 'two', 'three' ]
console.log(arr.slice(1)); //[ 'two', 'three' ]
console.log(arr.slice(-1)); //[ 'three' ]
console.log(arr.slice(-2)); //[ 'two', 'three' ]

