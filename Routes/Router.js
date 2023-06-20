/**
 * Importation des modules nécéssaires 
 */
const express = require("express");
let Router = express.Router()
const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * 
 * Route GET pour afficher le formulaire de création d'un livre avec des informations pré-remplie 
 */

function getEmployeeMenu() {
  return [{ text: 'Accueil', path: "/" }, {text:'Livres',path:"/books"}, {text:'Employeurs',path:'/employee'} ,{text:'Adherents',path:'/adherent'}, {text:'Prets',path:"/loans"},{ text: 'Déconnexion',path:"/login" }]
}
function getAdherantMenu() {
  return [{ text: 'Accueil', path: "/" }, { text: 'Livres disponibles',path: "/booksusers"  },{ text: 'Mon pret',path: "/loansusers"  } , { text: 'Déconnexion',path: "/login"  }]

}
function getPublicMenu() {
  return [{ text: 'Accueil', path: "/" }, { text: 'Connexion',path: "/login"  }]
}


function getMenuForUser(user) {
  if (!user) {
    return getPublicMenu();
  }
  if (user.type === 'Employee') {
    return getEmployeeMenu();
  }

  if (user.type === "Subscriber") {
    return getAdherantMenu();
  }


}
/**
 * Route GET pour l'affichage des livres disponibles pour les membres lorsqu'ils ne sont associées a aucun prets
 */
Router.get('/booksusers', (req, res) => {
  const token = req.query.token;
  
  if (!token) {
    res.redirect('/login');
    return;
  }
  
  const verifyTokenSql = 'SELECT type,id FROM users WHERE token = ?';
  
  req.conn.query(verifyTokenSql, [token], (err, result) => {
    if (err) {
      throw err;
    }
    
    console.log(result);
    
    if (result.length > 0) {
      const userType = result[0].type;
      let headers = getMenuForUser(result[0]);
      
      const sql = `
        SELECT books.*
        FROM books
        LEFT JOIN loans ON books.id = loans.idBooks
        WHERE loans.idBooks IS NULL
      `;
      
      req.conn.query(sql, (error, books) => {
        if (error) {
          console.log(error);
          res.render('error', { message: 'Une erreur est survenue lors de la récupération des livres disponibles.' });
          return;
        }
        
        // Rendre la vue avec les livres disponibles
        res.render('booksusers', { books, token, headers, userType });
      });
    } else {
      res.render('error');
    }
  });
});


/**
 * Route GET pour la page d'accueil
 */
Router.get("/", (req, response) => {
  const token = req.query.token;

  const verifyTokenSql = 'SELECT type FROM users WHERE token = ?';
  req.conn.query(verifyTokenSql, [token], (err, result) => {
    if (err) {
      throw err;
    }

      var headers = getMenuForUser(result?result[0]:undefined)
      //const userType = result[0].type;
      

    response.render('index', { token, headers });
  });
});


/**
 * Route GET pour afficher la formulaire de création d'un adhérent avec des informations pré-remplie
 */
Router.get("/adherent", (req, response) => {
  const token = req.query.token;

  if (!token) {
    response.redirect('/login');
    return;
  }
  const verifyTokenSql = 'SELECT type FROM users WHERE token = ?';
  req.conn.query(verifyTokenSql, [token], (err, result) => {
    if (err) {
      throw err;
    }
    if (result.length > 0 && result[0].type === 'Employee') {
      let headers = getMenuForUser(result[0])

      var sql = "SELECT * FROM users WHERE type='Subscriber'";
      req.conn.query(sql, (err, adherent) => {
        if (err) throw err;
        // console.log(adherent);
        req.conn.close()
        response.render('Adherents', { adherent, token,headers })
      });
    } else {
      response.render('error');
    }
  })
})
/**
 * Route GET pour afficher le formulaire de création d'un employeur avec des informations pré-remplie pour un update 
 */
Router.get("/createadherent/:id", (req, response) => {
  const token = req.query.token;

  if (!token) {
    response.redirect('/login');
    return;
  }
  const verifyTokenSql = 'SELECT type FROM users WHERE token = ?';
  req.conn.query(verifyTokenSql, [token], (err, result) => {
    if(err){
      throw err
    }if(result.length > 0 && result[0].type === 'Employee'){
      let headers = getMenuForUser(result[0]);
      var sql = "SELECT * FROM users WHERE type='Subscriber'  AND id=?";
      req.conn.query(sql, [req.params.id], (err, adherent) => {
      if (err) throw err;
      console.log(adherent);
      req.conn.close()
      response.render('form/createadherents', { adherent: adherent[0], token, headers })
    });

    }else{
      response.render('error')
    }
  })
})

/**
 * Route GET pour afficher tous les employeurs
 */
Router.get("/createemployee/:id", (req, response) => {
  const token = req.query.token;

  if (!token) {
    response.redirect('/login');
    return;
  }
  const verifyTokenSql = 'SELECT type FROM users WHERE token = ?';
  req.conn.query(verifyTokenSql, [token], (err, result) => {
  if(err){
    throw err
  }
  console.log(token)
  console.log(result)
  if(result.length > 0 && result[0].type === 'Employee'){
    let headers = getMenuForUser(result[0]);
     var sql = "SELECT * FROM users WHERE type='Employee'  AND id=?";
  req.conn.query(sql, [req.params.id], (err, employee) => {
    if (err) throw err;
    // console.log(employee);
    req.conn.close()
    response.render('form/createemployee', { employee: employee[0], token,headers })
  });

  }else{
    response.render('error')
  }
})
})


/**
 * Route GET pour afficher le formulaire de creation auteur avec des informations pré-remplie pour un update 
 */
Router.get("/employee", (req, response) => {
  const token = req.query.token;

  if (!token) {
    response.redirect('/login');
    return;
  }
  const verifyTokenSql = 'SELECT type FROM users WHERE token = ?';
  req.conn.query(verifyTokenSql, [token], (err, result) => {
    if (err) {
      throw err;
    }
    if (result.length > 0 && result[0].type === 'Employee') {
      let headers = getMenuForUser(result[0])
      var sql = "SELECT * FROM users WHERE type='Employee'";
      req.conn.query(sql, (err, employee) => {
        if (err) throw err;

        req.conn.close();
        response.render('employee', { employee, token,headers });
      });
    } else {
      response.render('error')
    }
  })

});

/**
 * la route "/autheur" Affiches la page des autheurs dans  author.ejs
 */
Router.get('/books', (req, response) => {
  const token = req.query.token;

  if (!token) {
    response.redirect('/login');
    return;
  }

  const verifyTokenSql = 'SELECT type FROM users WHERE token = ?';
  req.conn.query(verifyTokenSql, [token], (err, result) => {
    if (err) {
      throw err;
    }
    if (result.length > 0 && result[0].type ==='Employee') {
      let headers = getMenuForUser(result[0])
      var sql = "SELECT * FROM books";
      req.conn.query(sql, (err, books) => {
        if (err) {
          throw err;
        }
        req.conn.close();
        response.render('books', { books, token,headers,userType:result[0].type });
      });
    } else {
      response.render('error');
    }
  });
});

Router.get("/signup", (req, response) => {
  var headers = getMenuForUser()

  response.render('signup', { token: "",headers })

})
// route get de update avec les informations pré-remplie  d'un auteur 

Router.get("/createbooks/:id", (req, response) => {
  const token = req.query.token;

  if (!token) {
    response.redirect('/login');
    return;
  }
  const verifyTokenSql = 'SELECT type FROM users WHERE token = ?';
  req.conn.query(verifyTokenSql, [token], (err, result) => {
    if(err){
      throw err
    }if(result.length > 0 && result[0].type === 'Employee'){
      let headers = getMenuForUser(result[0]);
      var sql = "SELECT * FROM books  WHERE id=?";
      req.conn.query(sql, [req.params.id], (err, books) => {
      if (err) throw err;
     // books[0].entry_date = new Date(books[0].entry_date).toLocaleDateString("fr-FR")
     // books[0].release_date = new Date(books[0].release_date).toLocaleDateString("fr-FR")
      console.log(books);
      req.conn.close()
      response.render('form/createbooks', { books: books[0], token, headers })
    });

    }else{
      response.render('error')
    }
  })
})

/**
 * la route "/login" Affiches la page de connexion dans  login.ejs
 */
Router.get("/login", (req, response) => {
  
  console.log(req.query)
  var headers = getMenuForUser()

  response.render('login', { token: "",headers })
})
Router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const sql = 'SELECT * FROM users WHERE email=? AND password=?';

  req.conn.query(sql, [email, password], (err, rows) => {
    if (err) {
      throw err;
    }

    if (rows.length > 0) {
      const user = rows[0];
      const userRole = user.type;

      if (userRole === 'Subscriber' || userRole === 'Employee') {
      
        const accessToken = jwt.sign({ email: user.email, id: user.id, userRole: user.type }, process.env.ACCESS_TOKEN_SECRET);


        const updatetoken = 'UPDATE users SET token = ? WHERE id = ?';
        req.conn.query(updatetoken, [accessToken, user.id], (err) => {
          if (err) {
            throw err;
          }

          res.json({ accessToken });
        });
      } else {
        res.status(401).json({ message: "Accès non autorisé" });
      }
    } else {
      res.status(401).json({ message: "Email ou mot de passe invalide" });
    }
  });
});

Router.get("/loans", (req, response) => {
  const token = req.query.token;
  if (!token) {
    response.redirect('/login');
    return;
  }
  const verifyTokenSql = 'SELECT type FROM users WHERE token = ?';
  req.conn.query(verifyTokenSql, [token], (err, result) => {
    if (err) {
      throw err;
    } if (result.length > 0 ) {
      const userType = result[0].type;
      let headers = getMenuForUser(result[0])
      const sql = `
        SELECT  loans.Date_loans,loans.Return_date,loans.idUsers, loans.idBooks, users.name AS userName,users.firstname AS firstName, books.title AS bookTitle,loans.id
        FROM loans
        INNER JOIN users ON loans.idUsers = users.id
        INNER JOIN books ON loans.idBooks = books.id
        `;

      req.conn.query(sql, (err, loans) => {
        if (err)
          throw err;

        req.conn.close();
        response.render('loans', {
          loans, token,headers,userType
        });
        console.log(loans)
      });
    } else { response.render('error') }
  })

});

Router.get("/loansusers", (req, response) => {
  const token = req.query.token;
  if (!token) {
    response.redirect('/login');
    return;
  }
  const verifyTokenSql = 'SELECT type,id FROM users WHERE token = ?';
  req.conn.query(verifyTokenSql, [token], (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result) 
    if (result.length > 0 ) {
      const userType = result[0].type;
      const userId = result[0].id
      let headers = getMenuForUser(result[0])
      const sql = `
        SELECT  loans.Date_loans,loans.Return_date,loans.idUsers, loans.idBooks, users.name AS userName,users.firstname AS firstName, books.title AS bookTitle
        FROM loans
        INNER JOIN users ON loans.idUsers = users.id
        INNER JOIN books ON loans.idBooks = books.id
        `;

      req.conn.query(sql, (err, loansusers) => {
        if (err)
          throw err;

        req.conn.close();
        response.render('loansusers', {
          loansusers, token,headers,userType, userId
        });
        console.log(loansusers)
      });
    } else { response.render('error') }
  })

});

Router.get("/createemployee", (req, response) => {
  const token = req.query.token
  
  const verifyTokenSql = 'SELECT type FROM users WHERE token = ?';
  req.conn.query(verifyTokenSql,[token],(err,result)=>{
    let headers = getMenuForUser(result[0])
    if(err){
      throw err;
    }if(result.length > 0 && result[0].type === 'Employee'){
  response.render('form/createemployee', { token,headers })
    }else{
      response.render('error')
    }
  })
})

Router.get("/createadherent", (req, response) => {
  const token = req.query.token
  
  const verifyTokenSql = 'SELECT type FROM users WHERE token = ?';
  req.conn.query(verifyTokenSql,[token],(err,result)=>{
    let headers = getMenuForUser(result[0])
    if(err){
      throw err;
    }if(result.length > 0 && result[0].type === 'Employee'){
  response.render('form/createadherents', { token,headers })
    }else{
      response.render('error')
    }
  })

})
Router.get("/createbooks", (req, response) => {
  const token = req.query.token
const verifyTokenSql = 'SELECT type FROM users WHERE token = ?';
req.conn.query(verifyTokenSql,[token],(err,result)=>{
  let headers = getMenuForUser(result[0])
  if(err){
    throw err;
  }if(result.length > 0 && result[0].type === 'Employee'){
     response.render('form/createbooks', { token,headers })
  }else{
    response.render('error')
  }
})
 
})

Router.get("/createloans", (req, response) => {
  const token = req.query.token;

  const bookssql = 'SELECT id, title FROM books';
  const userssql = 'SELECT id, name, firstname FROM users WHERE type = "Subscriber"';
  const verifyTokenSql = 'SELECT type FROM users WHERE token = ?';
  req.conn.query(verifyTokenSql, [token], (err, result) =>{
    if (err) {
      throw err;
    } if(result.length > 0 && result[0].type === 'Employee'){
      let headers = getMenuForUser(result[0])
        req.conn.query(bookssql, (err, booksresult) => {

      req.conn.query(userssql, (err, usersresult) => {
        if (err) throw err;

        req.conn.close();

        const books = booksresult;
        const users = usersresult;

        response.render('form/createloans', { token, books, users,headers });
      });
    });
    }else{
      response.render('error')
    }
  })

});

module.exports = Router;