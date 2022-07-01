const express = require('express');
const app = express();
const port = 4000;
const fs = require('fs');
const db = require('./.db');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.text());
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
app.post('/js/json/user.json', function(req, res) {
    let sessionCookie = req.cookies.session;
    console.log("sessionCookie: ", sessionCookie);
    if (sessionCookie !== undefined) {
        db.query(`select username, contact from Users where id in (select user_id from session where session_hash = "${sessionCookie}")`, (result) => {
            let data = result[0];
            let user = {
                username: data['username'],
                email: data['contact']
            }
            res.json(user);
            res.end();
        });
    } else {
        db.query('select session_hash from session', data => {
            let hash = db.md5(Math.random());
            let hashes = [];
            for (let i of data) {
                hashes.push(i.session_hash);
            }
            let valid = true;
            while (true) {
                for (let i = 0; i < hashes.length; i++) {
                    let $hash = hashes[i];
                    if ($hash === hash) {
                        valid = false;
                    }
                }
                if (valid) {
                    break;
                } else {
                    hash = db.md5(Math.random());
                }
            }

            let time = new Date().getTime() / 1000;
            let username = req.body['username'];
            console.log("username:", username);
            console.log("password:", req.body['password']);
            let pswd = db.md5(req.body['password']);
            console.log("encrypted password:", pswd);
            console.log("hash:", hash);
            db.query(`select id from Users where username = "${username}" and password = "${pswd}"`, result => {
                if (result.length === 1) {
                    let userID = result[0]['id'];
                    db.query(`insert into session (user_id, timestamp, session_hash) values 
                    ('${userID}', '${time}', '${hash}')`);
                    db.query('select username, contact from Users where id = ' + userID, newResult => {
                        let data = newResult[0];
                        let user = {
                            username: data['username'],
                            email: data['contact'],
                        }
                        res.cookie('session', hash);
                        res.json(user);
                        res.end();
                    });
                } else {
                    res.json('wrong username / password');
                    res.end();
                    return;
                }
            });
        });
    }
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