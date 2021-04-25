let request = require("request");
let cheerio = require("cheerio");
let fs = require("fs");
let path = require("path");
let PDFDocument = require('pdfkit');
let url = "https://github.com/topics";
request(url, cb);
function cb(err, response, html) {
    if (err) {
        console.log(err);
    } else {
        // console.log(html);
        extractData(html);
    }
}

//extract repository link of each topic
function extractData(html) {
    let selTool = cheerio.load(html);
    let anchors = selTool
        (".no-underline.d-flex.flex-column.flex-justify-center");
    for (let i = 0; i < anchors.length; i++) {
        let link = selTool(anchors[i]).attr("href");
        // console.log(link);
        let fullLink = "https://github.com" + link;
        extractRepodata(fullLink)
    }
}

//send request to repository link of each topic
function extractRepodata(fullLink) {
    request(fullLink, cb);
    function cb(err, response, html) {
        if (err) {
            console.log(err);
        } else {
            getRepoLinks(html);
        }
    }
}

//extract link of issue from each repository link
function getRepoLinks(html) {
    let selTool = cheerio.load(html);
    let topicNameElem = selTool(".h1-mktg");
    let repolinks = selTool("a.text-bold");
    // console.log(topicNameElem.text());
    let topicName = topicNameElem.text().trim();
    dirCreater(topicName);
    for (let i = 0; i < 8; i++) {
        let repoPageLink = selTool(repolinks[i]).attr("href");
        //console.log(repoPageLink);
        let repoName = repoPageLink.split("/").pop();
        //let repoName = repoPageLink.split("/");
        //console.log(repoName);
        repoName = repoName.trim();
        // console.log(repoName);
        createFile(repoName, topicName);
        let fullRepoLink = "https://github.com" + repoPageLink + "/issues";
        //console.log(fullRepoLink);
        getIssues(repoName, topicName, fullRepoLink);
    }
    console.log("`````````````````````````");
}

//send request to each issue link
function getIssues(repoName, topicName, repoPageLink) {
    request(repoPageLink, cb);
    function cb(err, resp, html) {
        if (err) {
            if (resp.statusCode == 404) {
                console.log("No issues page found");
            } else {
                console.log(err);
            }
        } else {
            extractIssues(html, repoName, topicName);
        }

    }
}

//extract name and link of each issue
//collect name and link of each issue in json format
//add content of json format into pdf file for each repository name
function extractIssues(html, repoName, topicName) {
    let selTool = cheerio.load(html);
    let IssuesAnchAr = 
    selTool("a.Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title");
    let arr = [];
    for (let i = 0; i < IssuesAnchAr.length; i++) {
        let name = selTool(IssuesAnchAr[i]).text();
        let link = selTool(IssuesAnchAr[i]).attr("href");
        arr.push({
            "Name": name,
            "Link": "https://github.com" + link
        })
    }
    //console.log(arr);
    //path of pdf file
    let filePath = path.join(__dirname, topicName, repoName + ".pdf");

    //instance for pdf file functions
    let pdfDoc = new PDFDocument;

    //save the file
    pdfDoc.pipe(fs.createWriteStream(filePath));

    //add contents to the file
    pdfDoc.text(JSON.stringify(arr));

    //end the stream
    pdfDoc.end();
    // fs.writeFileSync(filePath, JSON.stringify(arr));
    // file write 
     console.table(arr);
}

//check if directory exists
//if not create a directory
function dirCreater(topicName) {

    //creating a path by combining current file path with topic name
    //function signature - join(path)
    //path - string used to create directory
    //_dirname - path of directory where file exists
    let pathOfFolder = path.join(__dirname, topicName);

    //function signature - existsSync(path)
    //path - string used to create directory
    //check whether the file exists in the path provided by above statement
    if (fs.existsSync(pathOfFolder) == false) {

        //creates a directory synchronously
        //mkdirSync(path,optional)
        //path - provide path to create directory
        fs.mkdirSync(pathOfFolder);
    }
}

//check if file exists
//if not create a directory
function createFile(repoName, topicName) {
    let pathofFile = path.join(__dirname, topicName, repoName + ".json");
    if (fs.existsSync(pathofFile) == false) {

        //createWriteStream(filepath) - write stream of data into given filepath 
        let createStream = fs.createWriteStream(pathofFile);

        //end stream of data
        createStream.end();
    }
}