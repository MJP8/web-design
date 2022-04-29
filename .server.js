const express = require('express');
const app = express();
const port = 4000;
const fs = require('fs');
const bodyParser = require('body-parser');
const db = require('./.db');
const md5 = require('md5');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.text());
db.getConnection('root', 'mjp2022', 3306, 'spider_webdesign');

function get(url, file, contentType) {
    app.get(url, function(req, res) {
        fs.readFile(file, function(err, data) {
            res.writeHead(200, { 'Content-Type': contentType });
            res.write(data);
            res.end();
            if (err) throw err;
        });
        console.log('200 GET ' + url);
    });
}
get('/', 'src/html/index.html', 'text/html');
get('/css/index.css', 'src/css/index.css', 'text/css');
get('/js/index.js', 'src/js/index.js', 'application/javascript');
get('/js/json/dynamic.json', 'src/js/json/dynamic.json', 'application/json');
get('/js/jquery.js', 'src/js/jquery.js', 'application/javascript');
get('/favicon.ico', 'src/img/favicon.png', 'image/png');
get('/new_site/', 'src/html/new_site.html', 'text/html');
get('/css/form.css', 'src/css/form.css', 'text/css');
get('/js/form_validation.js', 'src/js/form_validation.js', 'application/javascript');
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
get('/js/form-control.js', 'src/js/form-control.js', 'application/javascript');
app.post('/data/', function(req, res) {
    let data = req.body;
    console.log('200 POST /data/');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
});
get('/log_in/', 'src/html/sign_in.html', 'text/html');
get('/sign_up/', 'src/html/sign_in.html', 'text/html');
app.post('/user/', function(req, res) {
    console.log(req.body);
    fs.readFile('src/html/user.html', function(err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        res.end();
        if (err) throw err;
    });
    let username = req.body['user-n'];
    let password = db.md5(req.body['user-pswd']);
    let contact = req.body['user-e'];
    let sign_up = req.body['signup'];
    if (sign_up === 'true') {
        db.query(`insert into Users (username, password, contact) values ("${username}", "${password}", "${contact}")`);
    }
});
app.get('/js/json/users.json', function(req, res) {
    db.query('select * from Users', (result) => {
        let users = db.parseUsers(result);
        res.json(users);
        res.end();
    });
});
app.post('/parse/username', function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    let username = req.body;
    let nameValid;
    db.query('select * from Users', result => {
        let records = db.parseUsers(result);
        let valid = 'true';
        records.forEach(record => {
            let $username = record.getName();
            if (username === $username) valid = 'false';
        });
        nameValid = valid;
        res.write(nameValid);
        res.end();
    });
});
get('/user/', 'src/html/user.html', 'text/html');
app.listen(port, function() {
    console.log(`Server listening at port ${port}`);
});