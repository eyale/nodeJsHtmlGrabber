const path = require('path');
const url = require('url');
const express = require('express');
const serveFavicon = require('serve-favicon');
const serveStatic = require('serve-static');
const got = require('got');
const cheerio = require('cheerio');
const app = express();
const port = process.env.PORT || 5555;

app
    .use(serveFavicon(path.join('static', 'favicon.ico')))
    .use(serveStatic(path.join('static')))
    .get('/', function (req, res) {
        const root = req.query.url;
        if (!root) {
            return res.send('Please specify url');
        }

        got(root)
            .then(response => {
                const html = response.body;
                const $ = cheerio.load(html);
                const links = $('a');
                const result = [];
                links.each(function(i, link){
                    const $link = $(link);
                    if (!$link.attr('href')) return;

                    const href = url.resolve(root, $link.attr('href'));

                    result.push(`<a href="${href}">${$link.text()}</a>`);
                });

                res.send(result.join('<br>'));
            })
            .catch(error => {
                console.error(error.response ? error.response.body : error);
                res.status(500).send('Some error');
            });
    })
    .post('/', function (req, res) {
        res.send('Got a POST request');
    })
    .listen(port, () => {
        console.log(`Server is running on ${port}`);
    });
