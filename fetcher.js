const request = require('request');
const fs = require('fs');

const URL = process.argv[2];
const filePath = process.argv[3];

request(URL, (error, response, body) => {
  if (error) {
    throw error;
  }
  fs.writeFile(filePath, body, (err) => {
    if (err) {
      throw err;
    }
    fs.stat(filePath, (err, stats) => {
      if (err) {
        throw err;
      }
      console.log(`Downloaded and saved ${stats.size} bytes to ${filePath}`);
    });
  });
});