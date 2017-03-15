var mysql = require('mysql');
var db2=null;

module.exports = function () {
    if(!db2) {        
        db2 = mysql.createPool({
                 host     : 'localhost',
                 user     : 'root',
                 password : 'root',
                 database : 'appay_bbdd',
                 port: '3306',
		         socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
                 connectionLimit: 10,
                 supportBigNumbers: true,
                 multipleStatements: true
        });   
    }
    return db2;
};