const express = require("express");
const authenticateJWT = require("../Midlewares/authentificationJWT");
let userEmployeeRouter = express.Router()

userEmployeeRouter.post("/", authenticateJWT, (req, res) => {
    const body = req.body
    var sql = "INSERT INTO users (name,firstname,address,email,telephone,password,type) VALUES (?,?,?,?,?,?, 'Employee')";
    req.conn.query(sql, Object.values(body), function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
        req.conn.close()
        res.send("ok")
    });
})

userEmployeeRouter.put("/:id", authenticateJWT, (req, res) => {
    const body = req.body
    var sql = "UPDATE users SET name=?,firstname=?,address=?,email=?,telephone=?,password=? WHERE id=?";
    req.conn.query(sql, [...Object.values(body), req.params.id], function (err, result) {
        if (err) throw err;
        console.log(result);
        req.conn.close()
        res.send("data updated")
    });
})

userEmployeeRouter.delete('/:id', authenticateJWT, (req,res)=>{
    const userId = req.params.id;
    const sql = "DELETE FROM users WHERE id =?"
    console.log(sql)
    req.conn.query(sql, [userId], (err, result) => {
        if (err) {
          console.error('Erreur lors  de la requête DELETE : ' + err.message);
          return;
        }
        req.conn.close()
        res.send('ok');
      });
    });

module.exports= userEmployeeRouter