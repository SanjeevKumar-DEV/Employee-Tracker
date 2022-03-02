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
              }
              if (data.chosenFunction === "View all roles") {
                viewRoles();
              }
              if (data.chosenFunction === "View all employees") {
                viewEmployees();
              }
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
          getAndCreateDepartment();
        }
      } else {
        console.log(data);
        exitNow();
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
        message: "Provide department name with no space between.",
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
