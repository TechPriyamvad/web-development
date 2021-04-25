let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";
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
        extractHtmlBowler(html);
    }
}

//to extract bowlers name 
function extractHtmlBowler(html) {
    let selectorTool = cheerio.load(html);

    //  bowler tables
    // page find
    let bowlerstable = selectorTool(".table.bowler");
    // let stringhtml= "";
    // for (let i = 0; i < bowlerstable.length; i++) {
    //     stringhtml +=selectorTool(bowlerstable[i]).html();
    // }
    // console.log(stringhtml);
    //console.log(bowlerstable);
    
    //iterate over table rows
    for (let i = 0; i < bowlerstable.length; i++) {
        let singleInningBol = selectorTool(bowlerstable[i]).find("tbody tr");
        //console.log(singleInningBol.length);
        for (let j = 0; j < singleInningBol.length; j++) {
            let singleAllCol = selectorTool(singleInningBol[j]).find("td");
            let name = selectorTool(singleAllCol[0]).text();
            let wickets = selectorTool(singleAllCol[4]).text();
            console.log("Name->",name,"wickets->",wickets);
        }
        console.log("```````````````````````````````");
        // get all bowler name, wickets
    }
    // console.log(stringhtml);
    // compare wickets

    // selectorTool
}

console.log("after");


