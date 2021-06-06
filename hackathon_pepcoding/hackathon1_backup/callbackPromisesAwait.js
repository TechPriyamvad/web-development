let fs = require("fs");

console.log("before");

//callbacks async programming
// fs.readFile("./f1.txt",cb);


// function cb(err,data)
// {
//     if(err)
//     {
//         console.log(err);
//     }
//     else{
//         console.log(data+"");
//         fs.readFile("./f2.txt",cb1);
//     }
// }

// function cb1(err,data)
// {
//     if(err)
//     {
//         console.log(err);
//     }
//     else{
//         console.log(data+"");
//     }
// }

//promises async programming
//method1
// let f1 = fs.promises.readFile("./f1.txt");
// let f2 = fs.promises.readFile("./f2.txt");
// let f3 = fs.promises.readFile("./f3.txt");

// f1.then(cb);
// f2.then(cb);
// f3.then(cb);

// function cb(data)
// {
//     console.log("content->" + data);
// }
// console.log("after");

//method 2
// let f1Promise = fs.promises.readFile("./f1.txt");
// f1Promise.then(function (data)
// {
//     console.log(data+"");
//     let f2Promise = fs.promises.readFile("./f2.txt");
//     return f2Promise;
// }).then(function (data)
// {
//     console.log(data+"");
//     let f3Promise = fs.promises.readFile("./f3.txt");  
//     return f3Promise;
// }).then(function (data)
// {
//     console.log(data+"");  
// }).catch(function (err)
// {
//     console.log(err);
// })

//async await programming
async function fn()
{
    try{
        let f1 = await fs.promises.readFile("./f1.txt");
        console.log(f1+"");
        let f2 = await fs.promises.readFile("./f2.txt");
        console.log(f2+"");
        let f3 = await fs.promises.readFile("./f3.txt");
        console.log(f3+"");
    } catch(err)
    {
        console.log(err);
    }
}

console.log("after");
fn();