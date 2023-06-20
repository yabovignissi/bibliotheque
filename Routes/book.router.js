/** 
 * Importation des modules nécessaires
*/ 
let express = require("express");
const authenticateJWT = require("../Midlewares/authentificationJWT");

/**
 * Création d'un routeur Express pour les routes relatives a un auteur
 */ 
let bookRouter = express.Router();

/**
 * Route pour la création d'un auteur
 */
bookRouter.post('/',authenticateJWT, (req, res) => {
    const formData = req.body;
    const sql = "INSERT INTO books (title, author, genre, release_date, entry_date) VALUES (?,?,?,?,?)";
    req.conn.query(sql, Object.values(formData), (err, result) => {
      if (err) {
        console.error('Erreur lors  de la requête INSERT : ' + err.message);
        return;
      }
      req.conn.close()
      res.send("ok")
    });
  });


  /**
 * Route pour la mise a jour d'un auteur 
 */
  bookRouter.put('/:id',authenticateJWT, (req, res) => {
    const formData = req.body;
    const sql = "UPDATE books SET title = ?, author = ?, genre = ?,release_date = ?, entry_date = ? WHERE id = ?";
    req.conn.query(sql,[...Object.values(formData),req.params.id], (err, result) => {
      if (err) {
        console.error('Erreur lors  de la requête UPDATE : ' + err.message);
        return;
      }
      req.conn.close()
      res.send('ok');
    });
  });


  /**
 * Route pour supprimer  un auteur 
 */
  bookRouter.delete('/:id',authenticateJWT,(req,res)=>{
    const booksId = req.params.id;
    const sql = "DELETE FROM books WHERE id =?"
    console.log(sql)
    req.conn.query(sql, [booksId], (err, result) => {
        if (err) {
          console.error('Erreur lors  de la requête DELETE : ' + err.message);
          return;
        }
        req.conn.close()
        res.send('Données  supprimer dans la base de données');
      });
    });

module.exports= bookRouter