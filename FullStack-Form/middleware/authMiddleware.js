const jwt = require('jsonwebtoken');
const db = require('../db.js');

function requireAuth (req, res, next) {
   const token = req.cookies.jwt;

   //Check if jwt exists
   if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
         if (err) {
            console.log(err.message);
            res.redirect('/');
         } else {
            console.log(decodedToken);
            next();
         }
      });
   }

   else {
      res.redirect('/');
   }
}

//Check current user

async function checkUser (req, res, next) {
   const token = req.cookies.jwt;

   //Check if jwt exists
   if (token) {
      jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
         if (err) {
            console.log(err.message);
            next();

         } else {

            //Searches for user with the decoded token id
            const user = await db.getUserById(decodedToken.id);

            //User could not be found
            if (user === null) {
               next();
               return
            }

            res.locals.user = user;
            res.locals.isAuthenticated = true;
            next();
         }
      });
   } else {
      next();
   }

}

module.exports = { requireAuth, checkUser };