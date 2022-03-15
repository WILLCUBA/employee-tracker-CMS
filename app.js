const mysql = require('mysql2')
const inquirer = require('inquirer');
const consoleTable = require('console.table')
const renderDepartments = require('./utils/dbquerys')

//create the conection 
const conn = mysql.createConnection({
    host:'localhost',user:'root',database:'employees',password:'93101231947*MySql'
})


const renderMenu = () => {
    return inquirer
    .prompt({
        type:'list',
        name:'menu',
        message:'What would you like to do',
        choices: ['View all departments','View all roles','Add a Deparment','Add a role','Add an employee', 'Update an employee role']
    }).then((choice) => {
        switch (choice.menu) {
            case 'View all departments':
                renderDepartments()
                renderMenu()
                break;
            default:
                break;
        }
    })
}


renderMenu()