require('dotenv').config();


const jwt = require('jsonwebtoken');

function authenticateJWT(req, res, next) {
  const auth = req.headers.authorization;
  if (auth) {
    const token = auth.split(' ')[1];
    console.log(token)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err) => {
      if (err) { res.sendStatus(403); }
      next();
    });
  } else {
    res.sendStatus(401);
  }
}
module.exports= authenticateJWT;
