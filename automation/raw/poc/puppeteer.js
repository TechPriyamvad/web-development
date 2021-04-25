let puppeteer = require("puppeteer");

//browser launch and opens a new tab
let browserWillBeLaunchedPromise = puppeteer.launch({
    headless: false
})

browserWillBeLaunchedPromise
    .then(function (browserInstance) {
        //new tab
        let newPagePromise = browserInstance.newPage();
        newPagePromise.then(function (newPage) {
            console.log("new tab opened");

            //visit pepcoding site
            let pageWillBeopenedPromise = newPage.goto("https://www.pepcoding.com");
            pageWillBeopenedPromise.then(function () {
                console.log("page is opened");
            })
        })
    })