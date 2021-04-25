// commands->
// view --tree, --flat
//  organize-> same folder , multiple folder
// help
// [node ,mycli.js ,view ,dirName ,mode]
// node mycli.js organize -/foldername
// node mycli.js help

////how to use contents of other file in current file////////
//use content of help file
let {helpFn}=require("./commands/help");
//use content of organize file
let {organizeFn} = require("./commands/organize");
// use content of view file
let {viewFn} = require("./commands/view");
////////////////////////////////////////////////////////

//remove first two words from input string 
let input=process.argv.slice(2);

//store first word
let cmd = input[0];

//calling functions related to a particular command
switch(cmd)
{
    //view command function called
    case "view":
        viewFn();
        break;
    //organize command function called
    case "organize":
        organizeFn();
        break;
    //help command function called
    case "help":
        helpFn();
        break;
    default:
        console.log("Wrong command enter help to see list of all commands");
}