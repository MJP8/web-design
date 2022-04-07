const express = require('express');
const app = express();
const port = 4000;
const fs = require('fs');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.get('/', function(req, res) {
    const file = 'src/html/index.html';
    fs.readFile(file, function(err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        res.end();
        if (err) throw err;
    });
});
app.get('/css/index.css', function(req, res) {
    const file = 'src/css/index.css';
    fs.readFile(file, function(err, data) {
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.write(data);
        res.end();
        if (err) throw err;
    });
});
app.get('/js/index.js', function(req, res) {
    const file = 'src/js/index.js';
    fs.readFile(file, function(err, data) {
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
        res.write(data);
        res.end();
        if (err) throw err;
    });
});
app.get('/js/json/dynamic.json', function(req, res) {
    const file = 'src/js/json/dynamic.json';
    fs.readFile(file, function(err, data) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(data);
        res.end();
        if (err) throw err;
    });
});
app.get('/js/jquery.js', function(req, res) {
    const file = 'src/js/jquery.js';
    fs.readFile(file, function(err, data) {
        res.writeHead(200, { 'Content-Type': 'application/js' });
        res.write(data);
        res.end();
        if (err) throw err;
    });
});
app.get('/favicon.ico', function(req, res) {
    const file = 'src/img/favicon.png';
    fs.readFile(file, function(err, data) {
        res.writeHead(200, { 'Content-Type': 'image/png' });
        res.write(data);
        res.end();
        if (err) throw err;
    });
});
app.get('/new_site/', function(req, res) {
    const file = 'src/html/new_site.html';
    fs.readFile(file, function(err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        res.end();
        if (err) throw err;
    });
});
app.get('/css/form.css', function(req, res) {
    const file = 'src/css/form.css';
    fs.readFile(file, function(err, data) {
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.write(data);
        res.end();
        if (err) throw err;
    });
});
app.get('/new_site/finished/', function(req, res) {
    const file = 'src/html/form-control.html';
    fs.readFile(file, function(err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        res.end();
        if (err) throw err;
    });
});
app.get('/js/form-control.js', function(req, res) {
    const file = 'src/js/form-control.js';
    fs.readFile(file, function(err, data) {
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
        res.write(data);
        res.end();
        if (err) throw err;
    });
});
app.post('/data/', function(req, res) {
    let data = req.body;
    console.log(data);
    for (const item in data) {
        if (Object.hasOwnProperty.call(data, item)) {
            const element = data[item];
            console.log(element);
        }
    }
    res.writeHead(200);
    res.end('');
});
app.listen(port, function() {
    console.log(`Server listening at port ${port}`);
});