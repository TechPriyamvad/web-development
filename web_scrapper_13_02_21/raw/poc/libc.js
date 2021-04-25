let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/ball-by-ball-commentary"
let request = require("request");
let cheerio = require("cheerio");

console.log("Before");
request(url,cb);
function cb(error,response,html)
{
    if(error)
    {
        console.log(error);
    }
    else{
        extractHtml(html);
    }
}

function extractHtml(html)
{
    let selectorTool = cheerio.load(html);
    let allCommentaries = 
    selectorTool(".match-comment-over-end");
    console.log(allCommentaries.length);
    let lastbComment = selectorTool(allCommentaries[0]).text();
    //let lastbComment1 = selectorTool(allCommentaries.text());
    console.log(lastbComment);
}

console.log("after");


