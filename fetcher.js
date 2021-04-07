const request = require('request');
const fs = require('fs');

const URL = process.argv[2];
const filePath = process.argv[3];

request(URL, (error, response, body) => {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  fs.writeFile(filePath, body, (err) => {
    if (err) throw err;
    console.log('File Saved');
  });
});