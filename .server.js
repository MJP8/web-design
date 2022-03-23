const express = require('express');
const app = express();
const port = 4000;
const fs = require('fs');
const urls = require('./.urls');
const url1 = urls.urls[0];
app.get(url1[0], function(req, res) {
    const file = url1[1];
    fs.readFile(file, function(err, data) {
        res.writeHead(200, { 'Content-Type': url1[2] });
        res.write(data);
        res.end();
        if (err) throw err;
    });
});
const url2 = urls.urls[1];
app.get(url2[0], function(req, res) {
    const file = url2[1];
    fs.readFile(file, function(err, data) {
        res.writeHead(200, { 'Content-Type': url2[2] });
        res.write(data);
        res.end();
        if (err) throw err;
    })
})
app.listen(port, function() {
    console.log(`Server listening at port ${port}`);
});