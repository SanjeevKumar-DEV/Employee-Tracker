INSERT INTO department (name)
VALUES ("Engineering"),
       ("Finance"),
       ("Legal"),
       ("Accounts"),
       ("IT"),
       ("Digital");

INSERT INTO role (title, salary, department_id)
VALUES ("IT Manager", "100000.00", 5), 
       ("Support IT Engineer", "50000.00", 5),
       ("Digital Manager", "100000.00", 6),
       ("Digital UI Designer", "70000.00", 6),
       ("Accounts Manager", "100000.00", 4),
       ("Senior Accountant", "80000.00", 4),
       ("Legal Manager", "100000.00", 3),
       ("Legal Analyst", "70000.00", 3),
       ("Finance Manager", "100000.00", 2),
       ("Finance Analyst", "70000.00", 2),
       ("Engineering Manager", "120000.00", 1),
       ("Senior Engineer", "90000.00", 1),
       ("Junior Engineer", "70000.00", 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sanjeev", "Kumar", 1, null),
       ("John", "Woo", 2, null),
       ("Tarak", "Anwar", 3, null),
       ("Goal", "Smith", 4, null),
       ("Patric", "Curtis", 5, null),
       ("Karla", "Tens", 6, null),
       ("Manta", "Techs", 7, null),
       ("Alexander", "Kisto", 8, null),
       ("Amelia", "Gill", 9, null),
       ("Sangakara", "Kumar", 10, null),
       ("Donald", "Rums", 11, null),
       ("Tale", "Rumsfield", 12, null),
       ("Tanya", "Garg", 13, null),
       ("Baani", "Kumar", 1, null);
