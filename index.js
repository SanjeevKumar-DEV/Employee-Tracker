// Import and require mysql2
const mysql = require("mysql2");
const inquirer = require("inquirer");
const cred = require("./env");
const printInTableFormat = require("./utils/tablePrint");

let db;

// Connect to database
const connectDB = () => {
  db = mysql.createConnection(
    {
      host: cred.DB_HOST,
      user: cred.DB_USER,
      password: cred.DB_PASSWORD,
      database: cred.DB_NAME,
    },
    console.log(`Connected to the employee_db database.`)
  );
  return true;
};

// Query to select all departments
const viewAllDepartment = () => {
  const sql = `SELECT * FROM department`;

  db.query(sql, (err, result, fields) => {
    if (err) {
      console.log({ error: err.message });
      return;
    }
    printInTableFormat(result);
  });
  return true;
};

// Query to select all from role;
const viewRoles = () => {
  const sql = `SELECT * FROM role`;

  db.query(sql, (err, result) => {
    if (err) {
      console.log({ error: err.message });
      return;
    }
    printInTableFormat(result);
  });
  return true;
};

// Query to select all from Employees;
const viewEmployees = () => {
  const sql = `SELECT * FROM employee`;

  db.query(sql, (err, result) => {
    if (err) {
      console.log({ error: err.message });
      return;
    }
    printInTableFormat(result);
  });
  return true;
};

// Query to select Employees by manager;
const viewEmployeesByManager = () => {
  const sql = `SELECT manager.id as manager_id, CONCAT(manager.first_name, ' ' , manager.last_name) AS manager_name, emp.id as employee_id, CONCAT(emp.first_name, ' ' , emp.last_name) AS employee_name
               FROM employee as manager
               INNER JOIN employee as emp ON manager.id = emp.manager_id 
               WHERE manager.manager_id IS NULL
               ORDER BY CONCAT(manager.first_name, ' ' , manager.last_name) ASC`;

  db.query(sql, (err, result) => {
    if (err) {
      console.log({ error: err.message });
      return;
    }
    printInTableFormat(result);
  });
  return true;
};

// Query to select Employees by manager;
const viewEmployeesByDepartment = () => {
  const sql = `SELECT department.id as department_id, department.name AS department_name, emp.id as employee_id, CONCAT(emp.first_name, ' ' , emp.last_name) AS employee_name
               FROM department
               INNER JOIN role ON department.id = department.id = role.department_id
               INNER JOIN employee as emp ON role.id = emp.role_id 
               ORDER BY department.name ASC`;

  db.query(sql, (err, result) => {
    if (err) {
      console.log({ error: err.message });
      return;
    }
    printInTableFormat(result);
  });
  return true;
};


// Query to select all from Employees;
const addDepartment = (departmentName) => {
  const sql = `insert into department (name) values ('${departmentName}')`;
  const sqlNewAddedDepartment = `select * from department where name = '${departmentName}'`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log({ error: err.message });
      return;
    } else {
      if (result !== null) {
        db.query(sqlNewAddedDepartment, (err, result) => {
          if (err) {
            console.log({ error: err.message });
            return;
          }
          console.log(`${departmentName} Department successfully added.`);
          printInTableFormat(result);
        });
      }
    }
  });
  return true;
};

// Query to select all from Employees;
const addRole = (title, salary, departmentId) => {
  const sql = `insert into role (title, salary, department_id) values ('${title}', '${salary}', '${departmentId}')`;
  const sqlNewAddedRole = `select * from role where title = '${title}' and salary = '${salary}' and department_id = '${departmentId}'`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log({ error: err.message });
      return;
    } else {
      if (result !== null) {
        db.query(sqlNewAddedRole, (err, result) => {
          if (err) {
            console.log({ error: err.message });
            return;
          }
          console.log(`${title} role successfully added.`);
          printInTableFormat(result);
        });
      }
    }
  });
  return true;
};

// Add Employees;
const addEmployee = (firstName, lastName, roleId, managerId) => {
  let sql;
  let sqlNewAddedEmployee;
  if (managerId === "") {
    sql = `insert into employee (first_name, last_name, role_id) values ('${firstName}', '${lastName}', '${roleId}')`;
    sqlNewAddedEmployee = `select * from employee where first_name = '${firstName}' and last_name = '${lastName}' and role_id = '${roleId}' and manager_id is null`;
  } else {
    sql = `insert into employee (first_name, last_name, role_id, manager_id) values ('${firstName}', '${lastName}', '${roleId}', '${managerId}')`;
    sqlNewAddedEmployee = `select * from employee where first_name = '${firstName}' and last_name = '${lastName}' and role_id = '${roleId}' and manager_id = '${managerId}'`;
  }
  db.query(sql, (err, result) => {
    if (err) {
      console.log({ error: err.message });
      return;
    } else {
      if (result !== null) {
        db.query(sqlNewAddedEmployee, (err, result) => {
          if (err) {
            console.log({ error: err.message });
            return;
          }
          console.log(
            `${firstName} ${lastName} successfully added in Employee list.`
          );
          printInTableFormat(result);
        });
      }
    }
  });
  return true;
};

// Update Employee;
const updateEmployee = (employee_id, role_id) => {
  const sql = `update employee set role_id = ${role_id} where id = '${employee_id}'`;
  const sqlUpdateEmployee = `select * from employee where id = '${employee_id}'`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log({ error: err.message });
      return;
    } else {
      if (result !== null) {
        db.query(sqlUpdateEmployee, (err, result) => {
          if (err) {
            console.log({ error: err.message });
            return;
          }
          console.log(
            `Employee id ${employee_id} updated to role id ${role_id}.`
          );
          printInTableFormat(result);
        });
      }
    }
  });
  return true;
};

// Update Employee manager;
const updateEmployeeManager = (employee_id, manager_id) => {
  const sql = `update employee set manager_id = ${manager_id} where id = '${employee_id}'`;
  const sqlUpdateEmployeeManager = `select * from employee where id = '${employee_id}'`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log({ error: err.message });
      return;
    } else {
      if (result !== null) {
        db.query(sqlUpdateEmployeeManager, (err, result) => {
          if (err) {
            console.log({ error: err.message });
            return;
          }
          console.log(
            `Employee id ${employee_id} updated to manager id ${manager_id}.`
          );
          printInTableFormat(result);
        });
      }
    }
  });
  return true;
};

// Code to handle Employee Tracker main menu

const exitOptions = ["Yes", "No"];
const employeeTrackerMenu = [
  "View all departments",
  "View all roles",
  "View all employees",
  "Add a department",
  "Add a role",
  "Add an employee",
  "Update an employee role",
  "Update employee managers",
  "View employees by manager",
  "View employees by department",
  "Delete departments, roles, and employees",
  "View the total utilized budget of a department",
  "Exit",
];
let employeeChosenOptions = [];

// Employee Tracker main flow
function employeeTracker() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Welcome to Employee Tracker!! Choose your Option.",
        name: "chosenFunction",
        choices: employeeTrackerMenu,
      },
    ])
    .then((data) => {
      employeeChosenOptions.push(data);
      if (data.chosenFunction !== "Exit") {
        if (data.chosenFunction.includes("View")) {
          const p1 = new Promise((resolve, reject) => {
            const time = 1000;
            if (time < 0) {
              reject(new Error("Something went wrong"));
            } else {
              connectDB();
              if (data.chosenFunction === "View all departments") {
                viewAllDepartment();
              } else if (data.chosenFunction === "View all roles") {
                viewRoles();
              } else if (data.chosenFunction === "View all employees") {
                viewEmployees();
              } else if (data.chosenFunction === "View employees by manager") {
                viewEmployeesByManager();
              } else if (data.chosenFunction === "View employees by department") {
                viewEmployeesByDepartment();
              }
              // View employees by manager
              var timeInterval = setTimeout(() => {
                clearInterval(timeInterval);
                db.end();
                resolve("Resolved after 3 seconds");
              }, time);
            }
          });
          Promise.all([p1])
            .then((values) => {
              employeeTracker();
            })
            .catch((err) => new Error(err));
        } else {
          if (data.chosenFunction === "Add a department") {
            getAndCreateDepartment();
          } else if (data.chosenFunction === "Add a role") {
            getAndCreateRole();
          } else if (data.chosenFunction === "Add an employee") {
            getAndCreateEmployee();
          } else if (data.chosenFunction === "Update an employee role") {
            updateEmployeeRole();
          } else if (data.chosenFunction === "Update employee managers") {
            getInputToUpdateEmployeeManager();
          }
        }
      } else {
        console.log(data);
        exitNow();
      }
    });
}

// Update Employee role
function getInputToUpdateEmployeeManager() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "employeeId",
        message: "Provide Employee ID to update its manager.",
      },
      {
        type: "input",
        name: "managerId",
        message:
          "Provide new manager ID to associate as employee's new manager.",
      },
    ])
    .then((data) => {
      if (data.employeeId !== "" && data.managerId !== "") {
        connectDB();
        updateEmployeeManager(data.employeeId, data.managerId);
        const time = 1000;
        var timeInterval = setTimeout(() => {
          clearInterval(timeInterval);
          db.end();
          employeeTracker();
        }, time);
      } else {
        console.log(`manager id and employee id cannot be empty.\r\n ${data}`);
      }
    });
}

// Update Employee role
function updateEmployeeRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "employeeId",
        message: "Provide Employee ID to update their role.",
      },
      {
        type: "input",
        name: "roleId",
        message: "Provide new role ID to update to.",
      },
    ])
    .then((data) => {
      if (data.employeeId !== "" && data.roleId !== "") {
        connectDB();
        updateEmployee(data.employeeId, data.roleId);
        const time = 1000;
        var timeInterval = setTimeout(() => {
          clearInterval(timeInterval);
          db.end();
          employeeTracker();
        }, time);
      } else {
        console.log(`role id and employee id cannot be empty.\r\n ${data}`);
      }
    });
}

// Add new Employee
function getAndCreateEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "Provide First Name.",
      },
      {
        type: "input",
        name: "lastName",
        message: "Provide Last Name.",
      },
      {
        type: "input",
        name: "roleId",
        message: "Provide Role ID.",
      },
      {
        type: "input",
        name: "managerId",
        message: "Provide Manager ID.",
      },
    ])
    .then((data) => {
      if (data.firstName !== "" && data.lastName !== "" && data.roleId !== "") {
        connectDB();
        addEmployee(data.firstName, data.lastName, data.roleId, data.managerId);
        const time = 1000;
        var timeInterval = setTimeout(() => {
          clearInterval(timeInterval);
          db.end();
          employeeTracker();
        }, time);
      } else {
        console.log(data);
      }
    });
}

// Create new role
function getAndCreateRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "Provide title name.",
      },
      {
        type: "input",
        name: "salary",
        message: "Provide salary for this role.",
      },
      {
        type: "input",
        name: "departmentId",
        message: "Provide department ID.",
      },
    ])
    .then((data) => {
      if (data.title !== "" && data.salary !== "" && data.departmentId !== "") {
        connectDB();
        addRole(data.title, data.salary, data.departmentId);
        const time = 1000;
        var timeInterval = setTimeout(() => {
          clearInterval(timeInterval);
          db.end();
          employeeTracker();
        }, time);
      } else {
        console.log(data);
      }
    });
}

//Add new department as per input
function getAndCreateDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "departmentName",
        message: "Provide department name.",
      },
    ])
    .then((data) => {
      if (data.departmentName !== "") {
        connectDB();
        addDepartment(data.departmentName);
        const time = 1000;
        var timeInterval = setTimeout(() => {
          clearInterval(timeInterval);
          db.end();
          employeeTracker();
        }, time);
      } else {
        console.log(data);
      }
    });
}

// Exit from the application
function exitNow() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Confirm to Exit ?",
        name: "exitOption",
        choices: exitOptions,
      },
    ])
    .then((data) => {
      if (data.exitOption === "Yes") {
        console.log("Bye!!");
      } else {
        employeeTracker();
      }
    });
}

const executeNow = () => {
  employeeTracker();
};

executeNow();

// Delete a movie
// app.delete('/api/movie/:id', (req, res) => {
//   const sql = `DELETE FROM movies WHERE id = ?`;
//   const params = [req.params.id];

//   db.query(sql, params, (err, result) => {
//     if (err) {
//       res.statusMessage(400).json({ error: res.message });
//     } else if (!result.affectedRows) {
//       res.json({
//       message: 'Movie not found'
//       });
//     } else {
//       res.json({
//         message: 'deleted',
//         changes: result.affectedRows,
//         id: req.params.id
//       });
//     }
//   });
// });

// Read list of all reviews and associated movie name using LEFT JOIN
// app.get('/api/movie-reviews', (req, res) => {
//   const sql = `SELECT movies.movie_name AS movie, reviews.review FROM reviews LEFT JOIN movies ON reviews.movie_id = movies.id ORDER BY movies.movie_name;`;
//   db.query(sql, (err, rows) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: 'success',
//       data: rows
//     });
//   });
// });

// BONUS: Update review name
// app.put('/api/review/:id', (req, res) => {
//   const sql = `UPDATE reviews SET review = ? WHERE id = ?`;
//   const params = [req.body.review, req.params.id];

//   db.query(sql, params, (err, result) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//     } else if (!result.affectedRows) {
//       res.json({
//         message: 'Movie not found'
//       });
//     } else {
//       res.json({
//         message: 'success',
//         data: req.body,
//         changes: result.affectedRows
//       });
//     }
//   });
// });

// Default response for any other request (Not Found)
// app.use((req, res) => {
//   res.status(404).end();
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
