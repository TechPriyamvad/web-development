let puppeteer = require("puppeteer");
// let { password, email } = require("../../../secrets");
let fs = require("fs");
let gtab;
console.log("Before");
let browserPromise = puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized",]
})
// /pages
browserPromise
    .then(function (browserInstance) {
        //open another new tab in browser
        //now there will be two tabs 
        let newTabPromise = browserInstance.newPage();
        //wait for promise to get in fulfilled state
        return newTabPromise;
    })
    //tab opened promise fulfilled
    .then(function (newTab) {
        // console.log(newTab);
        //opens a new page in tab opened in above statement
        let loginPageWillBeopenedPromise = newTab.goto("https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login");
        //reference of opened tab object
        gtab = newTab;
        //wait for promise to get in fulfilled state
        return loginPageWillBeopenedPromise;
    })
    //page opened promise fulfilled
    .then(function () {
        // console.log("login Page opened");
        //entering email promise
        let emailWillBeTypedPromise = gtab.type("#input-1", "kafad90918@bombaya.com", { delay: 200 });
        return emailWillBeTypedPromise;
    })
    .then(function () {
        //entering password promise
        let passwordWillBeTypedPromise = gtab.type("#input-2",
            "1_agnisys", { delay: 200 });
        return passwordWillBeTypedPromise;
    })
    .then(function () {
        //button clicked promise
        let loginPageWillBeClickedpromise = gtab.click("button[data-analytics='LoginPassword']");
        //wait for below selector to get loaded in particular page
        let IPKitChallenge = gtab.waitForSelector(".card-content h3[title='Interview Preparation Kit']", { visible: true });
        //to wrap more than one promise in single promise we use promiseall
        //promise1 : login page will be clicked
        //promise2 : navigation of pages will be completed
        //promise3 : next page selector html elements will get loaded on ui
        //after above 3 promise gets fulfilled then resultant promise will be fulfilled
        let combinedPromise = Promise.all([loginPageWillBeClickedpromise, gtab.waitForNavigation({ waitUntil: "networkidle0" }), IPKitChallenge]);
        return combinedPromise;
    })
    .then(function () {
        let clickpromise = gtab.click(".card-content h3[title='Interview Preparation Kit']");
        let warmupChallengeElementPromise = gtab.waitForSelector("a[data-attr1='warmup']", { visible: true });
        let combinedPromise = Promise.all([clickpromise, gtab.waitForNavigation({ waitUntil: "networkidle0" }),
            warmupChallengeElementPromise]);
        return combinedPromise;
    })
    .then(function () {
        let clickpromise = gtab.click("a[data-attr1='warmup']");
        let sockMerchantPromise = gtab.waitForSelector("a[data-attr1='sock-merchant']", { visible: true });
        let combinedPromise = Promise.all([clickpromise, gtab.waitForNavigation({ waitUntil: "networkidle0" }), sockMerchantPromise]);
        return combinedPromise;
    })
    .then(function () {
        let clickpromise = gtab.click("a[data-attr1='sock-merchant']");
        let combinedPromise = Promise.all([clickpromise, gtab.waitForNavigation({ waitUntil: "networkidle0" })]);
        return combinedPromise;
    })
    .then(function () {
        let questionWillSolvedpromise = questionSolver();
        return questionWillSolvedpromise;
    })
    .catch(function (err) {
        console.log(err);
    })
// function questionSolver() {
//     return new Promise(function (resolve, reject) {
//         fs.readFile("")


//     })
// }



console.log("After");
