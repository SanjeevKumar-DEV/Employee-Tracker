// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer');
// const { indexOf, result } = require('lodash');
const cred = require('./env');

let db;

// Connect to database
const connectDB = () => {
db = mysql.createConnection(
  {
    host: cred.DB_HOST,
    // MySQL username,
    user: cred.DB_USER,
    // TODO: Add MySQL password here
    password: cred.DB_PASSWORD,
    database: cred.DB_NAME
  },
  console.log(`Connected to the employee_db database.`), 
);
return true;
}

// let insertEngineerYesInternNo = true;
const teamMemberType = ['Engineer', 'Intern']
const moreTeamMembers = ['Yes', 'No'];
const teamMembersInput = [];

// Query to select all from Employee
const test = () => {
  const sql = `SELECT * FROM employee`;
  
  db.query(sql, (err, result, fields) => {
    if (err) {
      console.log({ error: err.message });
       return;
    }
    console.table(result);
  });
  return true;
}

// Query to select all from role;
  const test1 = () => {
    const sql = `SELECT * FROM role`;
    
    db.query(sql, (err, result) => {
      if (err) {
        console.log({ error: err.message });
         return;
      }
      console.table(result);
    });
    return true;
  }
// Code to handle Employee Tracker main menu

const exitOptions = ['Yes', 'No'];
const employeeTrackerMenu = ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Exit'];
let employeeChosenOptions = [];

function employeeTracker() {
  inquirer
      .prompt([
          {
              type: 'list',
              message: 'Welcome to Employee Tracker!! Choose your Option.',
              name: 'chosenFunction',
              choices: employeeTrackerMenu,
          },
      ])
      .then((data) => {
        employeeChosenOptions.push(data);
          if (data.chosenFunction !== 'Exit') 
          {
            const p1 = new Promise((resolve, reject) => {
              const time = 1000;
              if (time < 0) {
                reject(new Error('Something went wrong'));
              } else {
                connectDB(); 
                test(); 
                test1();
                var timeInterval = setTimeout(() => {
                      clearInterval(timeInterval);
                      db.end();
                      resolve('Resolved after 3 seconds');
                }, time);
              }
            });
            Promise.all([p1])
              .then((values) => {
                employeeTracker();
              })
             .catch((err) => new Error(err));
          }
          else {
            console.log(data);
            exitNow();
          }
      });
}
// Exit from the application
function exitNow() {
  inquirer
      .prompt([
          {
              type: 'list',
              message: 'Confirm to Exit ?',
              name: 'exitOption',
              choices: exitOptions,
          },
      ])
      .then((data) => {
          if (data.exitOption === 'Yes') 
          {
            console.log("Bye!!");
          }
          else {
            employeeTracker();
          }
      });
}

const executeNow = () => {
  employeeTracker();
}

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
