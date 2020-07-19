let MyPromise = require('./MyPromise.js');

let promise = new MyPromise(function(resolve, reject) {
    setTimeout(function() {
        resolve(123);
    }, 1000);
});

promise.then((value) => {
    console.log('value1', value);
    return new MyPromise((resolve, reject) => {
        resolve(456);
    }).then((value) => {
        return new MyPromise((resolve, reject) => {
            resolve(789);
        })
    });
}, (reason) => {
    console.log('reason1', reason);
}).then((value) => {
    console.log('value2', value);
}, (reason) => {
    console.log('reason2', reason);
});