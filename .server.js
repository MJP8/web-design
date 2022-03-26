const express = require('express');
const app = express();
const port = 4000;
const fs = require('fs');
app.get('/', function(req, res) {
    const file = 'src/index.html';
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
app.listen(port, function() {
    console.log(`Server listening at port ${port}`);
});