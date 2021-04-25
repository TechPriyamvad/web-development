let request = require("request");
let cheerio = require("cheerio");
let fs = require("fs");
let path = require("path");

let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595"
console.log("####################start of program#####################");

//sending request to link stored inside url variable
function getFixturesAndResultsLink(url)
{
    request(url,cb);
    function cb(err,resp,html)
    {
        if(err)
        {
            console.log(err);
        }
        else{
            //console.log(html);
            getMatchData(html);
        }
    }
}
getFixturesAndResultsLink(url);

//extracting fixtures and results element link 
function getFixturesAndResultsData(html)
{
    let extractTool = cheerio.load(html);
    let fixturesAndResults = extractTool(".jsx-850418440.navbar-nav li");
    //console.log(fixturesAndResults.length);

    let fixturesAndResultsLink = extractTool(fixturesAndResults[1]).find("a");
    let fullLink = "https://www.espncricinfo.com" + extractTool(fixturesAndResultsLink).attr("href");

    //console.log(fullLink);
    getMatchLink(fullLink);
}

//sending request to fixtures and results link
function getMatchesLink(link)
{
    request(link,cb);
    function cb(err,resp,html)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            getMatchesData(html);
        }
    }
}

function getMatchesData(html)
{
    
}


console.log("####################end of program#####################");