const mysql = require('mysql2');


const connection = mysql.createConnection({
  host: 'localhost',
  port: 3001,
  user: 'root',
  password: '93101231947*MySql',
  database: 'employees',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = connection;