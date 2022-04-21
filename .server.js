const express = require('express');
const app = express();
const port = 4000;
const fs = require('fs');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.get('/', function(req, res) {
    const file = 'src/html/index.html';
    fs.readFile(file, function(err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        res.end();
        if (err) throw err;
    });
    console.log('200 GET /');
});
app.get('/css/index.css', function(req, res) {
    const file = 'src/css/index.css';
    fs.readFile(file, function(err, data) {
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.write(data);
        res.end();
        if (err) throw err;
    });
    console.log('200 GET /css/index.css');
});
app.get('/js/index.js', function(req, res) {
    const file = 'src/js/index.js';
    fs.readFile(file, function(err, data) {
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
        res.write(data);
        res.end();
        if (err) throw err;
    });
    console.log('200 GET /js/index.js');
});
app.get('/js/json/dynamic.json', function(req, res) {
    const file = 'src/js/json/dynamic.json';
    fs.readFile(file, function(err, data) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(data);
        res.end();
        if (err) throw err;
    });
    console.log('200 GET /js/json/dynamic.json');
});
app.get('/js/jquery.js', function(req, res) {
    const file = 'src/js/jquery.js';
    fs.readFile(file, function(err, data) {
        res.writeHead(200, { 'Content-Type': 'application/js' });
        res.write(data);
        res.end();
        if (err) throw err;
    });
    console.log('200 GET /js/jquery.js');
});
app.get('/favicon.ico', function(req, res) {
    const file = 'src/img/favicon.png';
    fs.readFile(file, function(err, data) {
        res.writeHead(200, { 'Content-Type': 'image/png' });
        res.write(data);
        res.end();
        if (err) throw err;
    });
    console.log('200 GET /favicon.ico');
});
app.get('/new_site/', function(req, res) {
    const file = 'src/html/new_site.html';
    fs.readFile(file, function(err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        res.end();
        if (err) throw err;
    });
    console.log('200 GET /new-site/');
});
app.get('/css/form.css', function(req, res) {
    const file = 'src/css/form.css';
    fs.readFile(file, function(err, data) {
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.write(data);
        res.end();
        if (err) throw err;
    });
    console.log('200 GET /css/form.css');
});
app.post('/new_site/finished/', function(req, res) {
    const file = 'src/html/form-control.html';
    fs.readFile(file, function(err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data.toString().replace(/<\/body>\s+<\/html>/m, `<data value='${JSON.stringify(req.body)}'></data></body></html>`));
        res.end();
        if (err) throw err;
    });
    console.log('200 POST /new_site/finished/');
});

app.get('/js/form-control.js', function(req, res) {
    const file = 'src/js/form-control.js';
    fs.readFile(file, function(err, data) {
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
        res.write(data);
        res.end();
        if (err) throw err;
    });
    console.log('200 GET /js/form-control.js');
});
app.post('/data/', function(req, res) {
    let data = req.body;
    console.log('200 POST /data/');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
});
app.listen(port, function() {
    console.log(`Server listening at port ${port}`);
});