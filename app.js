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
            case 'Add an employee':
                createEmployee()
                break;
            case 'Update an employee role':
                updateEmployeeRole()
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


//create an employee

const createEmployee = () => {
    return inquirer
        .prompt([
            {
                type:'input',
                name:'first_name',
                message:'What is the first name of the new employee'
            },
            {
                type:'input',
                name:'last_name',
                message:'What is the last name of the new employee'
            },
            {
                type:'input',
                name:'role_id',
                message:'Enter the id of the role'
            },
            {
                type:'input',
                name:'manager_id',
                message:'What is the id of the manager'
            }
        ])
        .then((answer) => {
            const params = [answer.first_name, answer.last_name,answer.role_id,answer.manager_id]
            const sql = `INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES (?,?,?,?)`
            conn.promise().query(sql,params)
            console.log('The new employee have been created!!!');
            renderMenu()
        })
}


const updateEmployeeRole = () => {
    const sqlForEmployees = `SELECT employee.first_name,employee.last_name FROM employee` 
    let employeesArr = []
    conn.promise().query(sqlForEmployees)
    .then(([rows,fields]) => {
        const first_name = rows.first_name;
        const last_name = rows.last_name;
        employeesArr = rows.map(rows => `${rows.first_name} ${rows.last_name}`)
        inquirer
        .prompt([
            {
                type:'list',
                name:'fullName',
                message:"Which employee's role do you want to update",
                choices: employeesArr
            },
            {
                type:'input',
                name:'roleId',
                message:"Enter the id of employee's new role (If you want to add a new rode to this employee please first select ->add new role<- from the main menu"
            }
            ]).then((answer) => {
                let sql = `UPDATE employee
                SET role_id = ?
                WHERE first_name= ? AND last_name= ?`;
                let params = [answer.role_id,answer.fullName.split(" ")[0],answer.fullName.split(" ")[0]]
                conn.promise().query(sql,params)
                console.log(`Role updated successfully`);
                renderMenu()
        })
    })
}

//buscar el empleado en la tabla y update el role


renderMenu()