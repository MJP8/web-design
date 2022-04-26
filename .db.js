const mysql = require('mysql');
const md5 = require('md5');
let con;
exports.getConnection = function(user, password, port, db) {
    con = mysql.createConnection({
        host: 'localhost',
        user: user,
        password: password,
        port: port,
        database: db
    });
    return con;
}
exports.query = function(sql, cb) {
    con.connect(function(err) {
        if (err) throw err;
        con.query(sql, function(err, result) {
            if (err) throw err;
            cb && cb(result);
        });
    });
}
exports.md5 = function(string) {
    return md5(string);
}