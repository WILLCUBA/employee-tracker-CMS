const db = require('../db/connection')

renderDepartments = () => {
    console.log("=========DEPARTMENTS========");
    const sql = `SELECT * FROM departments`
    db.promise().query(sql, (err,rows) => {
        console.table(rows)
    })
}
