const mysql = require('mysql2')
const inquirer = require('inquirer')
const cTable = require('console.table')

const conn = mysql.createConnection({
    host:'localhost',user:'root',database:'employees',password:'93101231947*MySql'
})


const renderDepartments  = () => {
    const sql =   `SELECT * FROM departments`; 
    conn.promise().query(sql)
        .then(([rows,fields]) => {
            (console.table(rows))
        })
  };

const renderRoles = () => {
    const sql = `SELECT * FROM roles;`
    conn.promise().query(sql)
    .then((rows => {
        console.table(rows)
    }))
}



module.exports = {
    renderDepartments : renderDepartments,
    renderRoles : renderRoles
}