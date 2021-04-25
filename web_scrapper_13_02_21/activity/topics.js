let url = "https://github.com/topics";
let request = require("request");
let cheerio = require("cheerio");

request(url,cb);

function cb(error, response, html) {
    if (error) {
        console.log(error)
    } else {
        // console.log(html);
        extractTopicName(html);
    }
}


function extractTopicName(html)
{
    let extractTool = cheerio.load(html);
    let topicName = extractTool(".f3.lh-condensed.text-center");
    let topicLinks = extractTool(".no-underline.d-flex.flex-column.flex-justify-center");
    //let topicLinksArr = [];

    //console.log(topicLinks.length);
    for(let idx=0;idx < topicLinks.length;idx++)
    {
        //console.log(extractTool(topicLinks[idx]).text());
        let linkOfTopic = extractTool(topicLinks[idx]).attr("href");
        let nameOfTopic = extractTool(topicName[idx]).text();
        let fullLink = "https://github.com" + linkOfTopic; 
        //console.log(fullLink + " " + nameOfTopic);
        //topicLinksArr.push(fullLink);
        getRepoPages(fullLink,nameOfTopic);
    }

    //serialTopic(topicLinksArr,0);
}

function getRepoPages(fullLink,topicName)
{
    request(fullLink,cb1);
    function cb1(err,response,data)
    {
        if(err)
        {
            console.log(err);
        }
        else{
            getRepoLinks(data,topicName);
        }
    }
}


function getRepoLinks(data,topicName)
{
    let extractTool = cheerio.load(data);
    let repoLink = extractTool(".f3.color-text-secondary.text-normal.lh-condensed a");
    //console.log(extractTool(repoLink[0]).attr("href"));
    //console.log(topicName);
    topicName = topicName.trim();
    createDirectory(topicName);

    for(let i=0;i < 8;i++)
    {
        let link = extractTool(repoLink[i]).attr("href");
        let fullLink = "https://github.com" + link; 
        //console.log(fullLink);
    }

    console.log("///////////////////////////////////////");
    console.log("\n");
}

function createDirectory(topicName)
{
    
}
console.log("end of program");