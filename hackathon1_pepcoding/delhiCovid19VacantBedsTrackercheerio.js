let puppeteer = require("puppeteer");
let link = "https://delhifightscorona.in";
let cheerio = require("cheerio");
let request = require("request");

let locationName = process.argv[2];
let rtab;

console.log("Before");


(async function () {
    try {
        let browserInstance = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized"]
        });
        let result = await getBedsLink(link, browserInstance);
        console.log("found bed details");
        //console.table(top3HospitalsBedDetails);
    } catch (err) {
        console.log(err);
    }
})();


//find hospitals having vacant beds
async function getBedsLink(link, browserInstance) {
    //open new tab
    let newTab = await browserInstance.newPage();
    //rtab = newTab;
    //visit page
    await newTab.goto(link);

    //click beds button
    await waitAndClick("#menu-item-5278", newTab);

    //click on covid-19 beds
    await waitAndClick(".card-header", newTab);
    
    //retrieve current page url
    let url = await newTab.url();

    //console.log(url);
    //retrieving details from hospital and storing them in array 
    //-vacant seat
    //-hospital name
    //-timestamp
    let html = await request(url);
    // function cb(response,err,data)
    // {
    //     if(err)
    //     {
    //         console.log(err);
    //     }
    //     else
    //     {
    //         getBedDetails(html);
    //     }
    // }
    getBedDetails(html);
}

function getBedDetails(html)
{
    let selectorTool = cheerio.load(html);
    let hospitalTable = selectorTool(".row.text-center");
    //let hospitalTableStr = "";
    // for (let i = 0; i < hospitalTable.length; i++) {
    //     hospitalTableStr += selectorTool(hospitalTable[i]).html();
    // }
    // console.log(hospitalTableStr);
    let hospitalRow = selectorTool("tbody tr .text-left");
    console.log(hospitalRow.length);
}

async function waitAndClick(selector, newTab) {
    await newTab.waitForSelector(selector, { visible: true });
    // we didn't wait this promise because we want  the calling perspn to await this promise based async function 
    let selectorClickPromise = newTab.click(selector);
    return selectorClickPromise;
}