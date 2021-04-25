let fs = require("fs");

let input = process.argv.slice(2);
let strArr = input[0].split("\\");
let toPrint = strArr.pop();

let dirPath = toPrint;
let content = listContent(dirPath);
console.log(content);

