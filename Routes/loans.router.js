let express = require("express");
const authenticateJWT = require("../Midlewares/authentificationJWT");

/**
 * Création d'un routeur Express pour les routes relatives aux prets
 */
let loansRouter= express.Router();


loansRouter.post('/', (req, res) => {
    const formData = req.body;
    const sql = "INSERT INTO loans(idUsers,idBooks,Date_loans, Return_date) VALUES (?,?,?,?)";
    console.log(formData)
    ;
    req.conn.query(sql, Object.values(formData), (err, result) => {
      if (err) {
        console.error('Erreur lors  de la requête INSERT : ' + err.message);
        return;
      }
      req.conn.close()
     
      res.send("super")
    });
});

loansRouter.put('/:id',authenticateJWT, (req, res) => {
    const formData = req.body;
    const sql = `
      UPDATE loans
      SET idUsers = ?, idBooks = ?, Date_loans = ?, Return_date = ?
      WHERE id = ?
    `;
    req.conn.query(sql,  [...Object.values(formData),req.params.id], (err, result) => {
        if (err) {
            console.error('Erreur lors  de la requête UPDATE : ' + err.message);
            return;
          }
          req.conn.close()
          res.send('super');
    });
});
  
 
loansRouter.delete('/:id',authenticateJWT, (req, res) => {
    const loanId = req.params.id;
    const sql = "DELETE FROM loans WHERE id = ?";
    req.conn.query(sql, [loanId], (err, results) => {
        if (err) {
            console.error('Erreur lors  de la requête DELETE : ' + err.message);
            return;
          }
          req.conn.close()
          res.send('Données  supprimer dans la base de données');
        });
});

module.exports=loansRouter