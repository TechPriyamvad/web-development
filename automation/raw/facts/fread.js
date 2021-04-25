let fs = require("fs");

let promise = fs.promises.readFile("f1.txt");

console.log("Initial state", promise);
console.log("after");

/* setTimeout(function() {
    console.log("final state",promise);
},2000)
 */

promise
    .then(function (data) {
        console.log(data);
    })

promise
    .catch(function (err) {
        console.log(err);
    })

console.log("hello");
//console.log(promise);