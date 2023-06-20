# bibliotheque
Création d'une bibliotheque
# Documentation
This document includes the documentation and implementation of a database for a library, in the
Aim to improve their management of:
*books
*Authors
*members
*loans.

How did we proceed?
The steps we followed:


Database analysis with Merise: We used the Merise method to analyze our database. We have therefore defined the Conceptual Data Model (CDM) and the Data Logic Model (MLD) of our database. The MCD represents the conceptual structure of the data, while the MLD defines the tables and columns in the database.


Creating SQL files: After defining the MLD, we created SQL files to create the tables and define the columns in the database.


Database configuration: We ran a script to create the database named "biblihy" and the necessary tables like "users", "books", "loans". To interact with our database we used the "mysql2" module of Node.js.


Choice of technologies for the development of the application: To develop the application we used EJS for the front to interact more easily with our back-end or we used Javascript.



Installation.
We have installed the necessary modules for the development of our application

npm i mysql2
npm i express
npm i ts-node
npm i nodemon
npm i jsonwebtoken
npm i dotenv


Back-end
In the Routes folder are several files including the Router file.js where all the functions with the get queries are located and in the other files are the functions with the post, put and delete queries for each table. These files are used to recover, create, modify and delete data.

Database setup
Run the script: npm run dev
this script will create the db (biblihy) and the tables (users, books, loans)

Start the server
Run the script: npm start
this script will launch the server and you just have to go to http://localhost:4000

Code source de l'application

SQL queries made: https://dev.mysql.com/doc/

Source code to develop the application :


https://nodejs.org/en/docs
https://semantic-ui.com/introduction/getting-started.html
