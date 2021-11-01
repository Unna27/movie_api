/* eslint-disable */
//create object for http, url and fs request
const http = require('http'),
  url = require('url'),
  fs = require('fs');

http
  .createServer((request, response) => {
    // get the url typed in browser and parse it using url request
    let addr = request.url,
      q = url.parse(addr, true),
      filePath = '';

    // log the URL and timestamp
    fs.appendFile(
      'log.txt',
      'URL: ' + addr + '\nTimestamp: ' + new Date() + '\n\n',
      err => {
        if (err) {
          throw err;
        }
        console.log('Added details to log file.');
      }
    );

    // check if the url has "documentation" keyword and set the filepath accordingly
    if (q.pathname.includes('documentation')) {
      filePath = __dirname + '/documentation.html';
    } else {
      filePath = 'index.html';
    }

    // using filesystem request read the contents of the respective html and display its data
    fs.readFile(filePath, (err, data) => {
      if (err) {
        throw err;
      }
      // return a html page with success code 200
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.write(data);
      response.end();
      // response.end('Hello Node\n');
    });
  })
  .listen(8080);
console.log('My Node server listens on 8080');
