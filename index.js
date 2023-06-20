let express = require('express');
const mysql = require('mysql2');
const userAdherentRouter = require('./Routes/userAdherent.router');
const userEmployeeRouter = require('./Routes/userEmployee.router');
const bookRouter = require('./Routes/book.router')

const signupRouter = require('./Routes/signup.router')
const loansRouter = require('./Routes/loans.router')

let app = express();
const port = 4000;

// configuration de app
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use((request, response, next) => {
  request.conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootroot',
    database: 'biblihy'
  });
  request.conn.connect((err) => {
    if (err) {
      console.error('Erreur de connexion :', err);
      return;
    }
    next()
  });
})

app.use(require("./Routes/Router"))
app.use('/adherent', userAdherentRouter)
app.use('/employee', userEmployeeRouter)
app.use('/books', bookRouter)
app.use('/signup', signupRouter)
app.use('/loans',loansRouter)


//EJS
app.set('views','./views')
app.set('view engine','ejs')




//demarrage du serveur
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});