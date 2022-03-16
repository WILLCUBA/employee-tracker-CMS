const mysql = require('mysql2')
const inquirer = require('inquirer');
const consoleTable = require('console.table')

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
                break;
            case 'View all roles':
                renderRoles()
                break;
            case 'Add a Deparment':
                createDepartment()
                break;
            case 'Add a role':
                addRole()
                
                break;    
            default:
                break;
        }
    })
}


//get all departments
const renderDepartments  = () => {
    let sql =   `SELECT * FROM departments`; 
    conn.promise().query(sql)
        .then(([rows,fields]) => {
            (console.table(rows))
            renderMenu()
        })
  };

//render all roles
  const renderRoles = () => {
    let sql = `SELECT roles.title AS Title, roles.salary AS Salary, departments.name AS Department
                FROM roles
                JOIN departments ON roles.department_id = departments.id`
    conn.promise().query(sql)
    .then(([rows,fields]) => {
        (console.table(rows))
        renderMenu()
    })
};

//create a department
const createDepartment = () => {
    return inquirer
        .prompt({
            type:'input',
            name: 'department',
            message: 'What is the name of the department'
        })
        .then((answer) => {
            let sql = `INSERT INTO departments (name) VALUES (?)`
            let params = [answer.department]
            conn.promise().query(sql,params)
            console.log(`The department ${answer.department} have been added to the db`);
            renderMenu()
        })
}


//Add a role
const addRole = () => {
    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'title',
                message: 'Please type the title of the new role'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Enter the salary for this role'
            },
            {
                type:'input',
                name:'departmentId',
                message:'Enter the department id of this role'
            }
    ])
    .then((answer) => {
        let sql = `INSERT INTO roles (title,salary,department_id) VALUES (?,?,?)`
        let params = [answer.title,answer.salary,answer.departmentId]
        conn.promise().query(sql,params)
        console.log(`The role ${answer.title} have been added to the db`);
        renderMenu()
    })
}



renderMenu()