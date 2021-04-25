let puppeteer = require("puppeteer");

let gtab,gtabDashboard;
console.log("Before");

let browserPromise = puppeteer.launch({
    //to show chromium while puppeteer is running
    headless:false,
    //to make page width equals to tab width
    defaultViewport: null,
    //to make tab width equal to screen width
    args: ["--start-maximized"]
})

browserPromise
.then(function(browserInstance)
{
    //open new tab
    let newTabPromise = browserInstance.newPage();
    //wait for promise to get fulfilled
    return newTabPromise;
})
.then(function (newTab)
{
    
    //load hackerrank page on above opened tab
    let loginPageWillBeopenedPromise = newTab.goto("https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login");
    
    //storing reference of newtab for later use in functions related tab 
    gtab = newTab;

    //wait for promise to get fulfilled
    return loginPageWillBeopenedPromise;
})
.then(function ()
{
    //typing email
    let emailWillBeTypedPromise = gtab.type("#input-1","kafad90918@bombaya.com",{delay:200});

    //wait for promise to get fulfilled
    return emailWillBeTypedPromise;
})
.then(function ()
{
    //typing password
    let passwordWillBeTypedPromise = gtab.type("#input-2","1_agnisys",{delay:200});
    //wait for promise to get fulfilled
    return passwordWillBeTypedPromise;
})
.then(function (){
    //clicking button
    let loginPageWillBeClickedpromise = gtab.click("button[data-analytics='LoginPassword']");
    let combinedPromise = Promise.all([loginPageWillBeClickedpromise,gtab.waitForNavigation({waitUntil:"networkidle0"})]);
    //wait for promise to get fulfilled
    return combinedPromise;
})

.then(function ()
{
    //let pageUrlPromise = gtab.url();
    //return pageUrlPromise;
    console.log("login done");
    let interviewPageWillBeClickedPromise = gtab.click("#base-card-1-link");
    let combinedPromise = Promise.all([interviewPageWillBeClickedPromise,gtab.waitForNavigation({waitUntil:"networkidle0"})]);
    return combinedPromise;
})

.then(function()
{
    console.log("interview preparation button clicked");
    let warmButtonWillBeClickedPromise = gtab.click("#base-card-6");
    let combinedPromise = Promise.all([warmButtonWillBeClickedPromise,gtab.waitForNavigation({waitUntil:"networkidle0"})]);
    return combinedPromise;
})

.then(function()
{
    console.log("warm button clicked!!!!!!!!!");
})

.catch(function (err)
{
    console.log(err);
})


/*
browserPromise
.then(function (newTab)
{
    let dashboardPageWillBeOpenedPromise = newTab.goto("https://www.hackerrank.com/dashboard");
    gtabDashboard = newTab;
    return dashboardPageWillBeOpenedPromise;
})
.then(function ()
{
    let interviewPageWillBeClickedPromise = gtabDashboard.click("#base-card-1-link");
    return interviewPageWillBeClickedPromise;
})
*/
console.log("after");