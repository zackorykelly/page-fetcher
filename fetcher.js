const request = require('request');
const fs = require('fs');
const readline = require('readline');



//Get args from command line
const URL = process.argv[2];
const filePath = process.argv[3];

const write = function(filePath, body) {
  fs.writeFile(filePath, body, (err) => {
    if (err) {
      throw new Error('Error! That path is invalid!');
    }
    fs.stat(filePath, (err, stats) => { //Gets stats from filePath so we can report how many bytes were written
      if (err) {
        throw new Error('Error getting stats from that file!');
      }
      console.log(`Downloaded and saved ${stats.size} bytes to ${filePath}`);
    });
  });
};

request(URL, (err, response, body) => {
  if (err) {
    throw new Error('Error accessing that URL!');
  } else if (response.statusCode !== 200) {
    throw new Error(`Invalid page! Error ${response.statusCode}!`);
  }
  fs.access(filePath, fs.F_OK, (err) => {
    if (err) {
      //file doesnt exist already, write to it!
      write(filePath, body);
    } else {
      //file already exists, prompt user
      //Init for readline
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      rl.question('File already exists, type Y to overwrite, or anything else to cancel. ', (answer) => {
        rl.close();
        if (answer === 'Y') {
          write(filePath, body);
        }
      });
    }
  });

});
