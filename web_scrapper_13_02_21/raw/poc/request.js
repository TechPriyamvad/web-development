//  let request = require("request");
//  console.log("Before");

//  //request is used to make http calls
//  request("https://www.google.com",cb);
//  function cb(error,response,html)
//  {
//      if(error)
//      {
//          console.log(error);
//      }
//      else{
//          console.log(html);
//      }
//  }

//  console.log("after");
const request = require('request');
request('http://www.google.com', function (error, response, body) {
  console.error('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});