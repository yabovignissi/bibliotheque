const mysql = require('mysql2');
const fs = require('fs')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rootroot',
});

/**
 *  delete database
 */

connection.query('DROP DATABASE IF EXISTS `biblihy`', function (err) {
  if (err) throw err;
  console.log("Database deleted");
});

/**
 *  create database
 */
connection.query('CREATE DATABASE IF NOT EXISTS `biblihy`', function (err) {
  if (err) throw err;
  console.log("Database created");
});


/**
 *  use database
 */
connection.query('USE`biblihy`', function (err) {
  if (err) throw err;
  console.log("Database selected");
});


/**
 *  create users table
 */
const UsersTable = fs.readFileSync('./database/tables/tableuser.sql', 'utf-8').replace(/(\r\n|\n|\r)/gm, "")
connection.query(UsersTable, function (err) {
  if (err) throw err;
  console.log("Users tables created");
});


/**
 *  create books table
 */

const BooksTable = fs.readFileSync('./database/tables/tablebooks.sql', 'utf-8').replace(/(\r\n|\n|\r)/gm, "")
connection.query(BooksTable, function (err) {
  if (err) throw err;
  console.log("Books tables created");
});

/**
 *  create loans table
 */

const LoansTable = fs.readFileSync('./database/tables/tableloans.sql', 'utf-8').replace(/(\r\n|\n|\r)/gm, "")
connection.query(LoansTable, function (err) {
  if (err) throw err;
  console.log("Loans tables created");
});
