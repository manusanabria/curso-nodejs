var http = require('http');
var url = require('url');
var querystring = require('querystring');
// var log = require('./modules/my-log');
var { info, error } = require('./modules/my-log');
var consts = require('./modules/utils/const');
var firebase = require('../libs/firebase');
var { countries } = require('countries-list');

var server = http.createServer(function (request, response) {
  var parsed = url.parse(request.url);
  console.log('parsed:', parsed);

  var pathname = parsed.pathname;
  var query = querystring.parse(parsed.query);
  console.log('query:', query);

  if (pathname === '/') {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write('<html><body><p>Home Page!!!</p></body></html>');
    response.end();
  } else if (request.url === '/exit') {
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write('<html><body><p>Bye!!!</p></body></html>');
    response.end();
  } else if (pathname === '/country') {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify(countries[query.code]));
    response.end();
  } else if (pathname === '/info') {
    var result = info(pathname);
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(result);
    response.end();
  } else if (pathname === '/error') {
    var result = error(request.url);
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(result);
    response.end();
  } else {
    response.writeHead(400, { 'Content-Type': 'text/html' });
    response.write('<html><body><p>Page Not Found!!!</p></body></html>');
    response.end();
  }
});

server.listen(4000);
console.log('Running on 4000');

// function suma(num1, num2) {
//   return num1 + num2;
// }

// var result = suma(2, 4);

// console.log('el resultado es: ', result);
