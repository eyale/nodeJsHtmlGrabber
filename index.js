const path = require('path');
const express = require('express');
const serveFavicon = require('serve-favicon');
const serveStatic = require('serve-static');
const got = require('got');
const jsdom = require("jsdom");
const xray = require('x-ray');
const cheerio = require('cheerio');
const app = express();
const request = require('request');
const port = 5555

app
    .use(serveFavicon(path.join('static', 'favicon.ico')))
    .use(serveStatic(path.join('static')))
    .get('/', function (req, res) {

      got('http://netvertise.co.il/')
          .then(response => {
            let html = response.body;
            let $ = cheerio.load(html)


            res.send(html)

            // links = $('a'); //jquery get all hyperlinks
            // $(links).each(function(i, link){
            //   res.s($(link).text() + ':\n  ' + $(link).attr('href'));
            // });



            // var request = require('request');
            // var cheerio = require('cheerio');
            // var searchTerm = 'screen+scraping';
            // var url = 'http://www.bing.com/search?q=' + searchTerm;
            // request(url, function(err, resp, body){
            //   $ = cheerio.load(body);
            //   links = $('a'); //jquery get all hyperlinks
            //   $(links).each(function(i, link){
            //     console.log($(link).text() + ':\n  ' + $(link).attr('href'));
            //   });
            // });

          })
          .catch(error => {console.log(error.response.body)});

      // res.send('Hello World!')
    })
    .post('/', function (req, res) {
      res.send('Got a POST request')
    })
    .listen(port);

console.log(`Server is running on ${port}`);
