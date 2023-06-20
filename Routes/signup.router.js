const express = require("express");
let signupRouter = express.Router()

signupRouter.post("/", (req, res) => {
    const body = req.body
    var sql = "INSERT INTO users (name,firstname,address,email,telephone,password,type,subscription) VALUES (?,?,?,?,?,?, 'Subscriber',?)";
    req.conn.query(sql, Object.values(body), function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
        req.conn.close()
        res.send("ok")
    });
})


module.exports=signupRouter