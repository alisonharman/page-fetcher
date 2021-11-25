const request = require('request');
const fs = require('fs');
/*
EXAMPLE USAGE:
> node fetcher.js http://www.example.edu/ ./index.html
Downloaded and saved 3261 bytes to ./index.html
*/

// take in command line arguments
let myArgs = process.argv.slice(2);
const url = myArgs[0];
const localPath = myArgs[1];

if (fs.existsSync(localPath)) {
  // path exists
  console.log("exists:", localPath);
} else {
  console.log("DOES NOT exist:", localPath);
  process.exit;
}

const fileDownload = function(url, localPath, callback) {
  request(url, (error, response, body) => {

    if (error) {
      callback(error, null);
      return;
    }
    
    if (response.statusCode !== 200) {
      callback(Error(`Status Code: ${response.statusCode}`), null);
      return;
    }
    //console.log('error:', error); // Print the error if one occurred

    //console.log('body:', body); // Print the HTML for the Google homepage.
    //callback(null, body);
    const file = localPath + '/download.txt';
    fs.writeFile(file, body, (err) => {
      if (err) {
        callback(err, null);
      } else {
        callback(err, body);
      }
    });
  });
};

fileDownload(url, localPath, (error, body) => {
  if (error) {
    console.log("it did not work!", error);
  } else {
    const bytes = body.length * 2;
    console.log('Success!');
    console.log(`Downloaded and saved ${bytes} bytes as ${localPath}/download.txt`);
  }
});