const mysql = require('mysql');
const md5 = require('md5');
let con;
class User {
    constructor(name, password, contact, id) {
        this.name = name;
        this.pswd = password;
        this.contact = contact;
        this.id = id || 1;
        this.getName = () => this.name;
        this.getPswd = () => this.pswd;
        this.getContact = () => this.contact;
        this.getId = () => this.id;
    }
}
exports.getConnection = function(user, password, port, db) {
    con = mysql.createConnection({
        host: 'localhost',
        user: user,
        password: password,
        port: port,
        database: db
    });
    con.connect();
    return con;
}
exports.query = function(sql, cb) {
    con.query(sql, function(err, result) {
        if (err) throw err;
        cb && cb(result);
    });
}
exports.md5 = function(string) {
    return md5(string);
}
exports.parseUsers = function(queryReturn) {
    let records = [];
    queryReturn.forEach(record => {
        const user = new User(record['username'], record['password'], record['contact'], record['id']);
        records.push(user);
    });
    return records;
}