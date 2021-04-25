let request = require("request");
let cheerio = require("cheerio");
let fs = require("fs");
let path = require("path");

let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595";
//let link = "https://www.espncricinfo.com/team/mumbai-indians-335978/match-results";
let tournament = "ipl 2020";

console.log("#############start of program##################");
request(url,cb);
function cb(err,response,html)
{
    if(err)
    {
        console.log(err);
    }
    else{
        getTeamsLink(html);
    }
}


/////////////////////////////////////Method1/////////////////////////////////////////////////////////
function getTeamsLink(html)
{
    
    dirCreator(tournament);
    let extractTool = cheerio.load(html);
    let link1 = extractTool(".jsx-850418440.custom-scroll");
    let link2 = extractTool(link1).find("ul li");
    //console.log(link2.length);

    let teamHalfLink = extractTool(link2[2]).find("a").attr("href");
    let teamFullLink = "https://www.espncricinfo.com" + teamHalfLink;
    getTeamName(teamFullLink);
}

function getTeamName(teamLink)
{
    request(teamLink,cb);
    function cb(err,resp,html)
    {
        if(err)
        {
            console.log(err);
        }
        else{
            extractTeamName(html);
        }
    }
}

function extractTeamName(html)
{
    let extractTool = cheerio.load(html);
    let teamNameTable = extractTool(".table-responsive");
    /* let stringhtml = "";
    for (let i = 0; i < teamNameTable.length; i++) {
        stringhtml +=extractTool(teamNameTable[i]).html();
    }
    console.log(stringhtml); */

    //console.log(teamNameTable.length);

    let teamNameArr = extractTool(teamNameTable).find("tbody tr .header-title.label");
    let teamLinkArr = extractTool(teamNameTable).find("tbody tr a.label.d-flex.align-items-center.row-name");
    //console.log(teamLinkArr.length);
    //console.log(teamNameArr.length);
    for(let idx=0;idx < teamNameArr.length;idx++)
    {
        let teamName = extractTool(teamNameArr[idx]).text();
        teamName = teamName.trim();
        let teamNameHalfLink = extractTool(teamLinkArr[idx]).attr("href");
        let teamNameFullLink = "https://www.espncricinfo.com" + teamNameHalfLink;
        //console.log(teamNameFullLink);
        //let dirpath = path.join(tournament,teamName);
        //dirCreator(dirpath);
        getTeamBatsmanNames(teamNameFullLink);
    }
}

function getTeamBatsmanNames(teamNameFullLink)
{
    request(teamNameFullLink,cb);
    function cb(err,resp,html)
    {
        if(err)
        {
            console.log(err);
        }
        else{
            getTeamNameLink(html);
        }
    }
}

function getTeamNameLink(html)
{
    let extractTool = cheerio.load(html);

    ///////////////////////////Problem occurred here//////////////////////////////////
    ///////////////////////////attribute selector not working/////////////////////////
    let result = extractTool("a[data-hover='View All Results']");
    console.log(result.text());

    
    //let fullLink = "https://www.espncricinfo.com" + halfLink;
    
}

function dirCreator(folderName)
{
    let pathOfFolder = path.join(__dirname,folderName);
    if(fs.existsSync(pathOfFolder) == false)
    {
        fs.mkdirSync(pathOfFolder);
    }
}

console.log("#############end of program##################");