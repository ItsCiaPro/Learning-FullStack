const express = require("express");
const { requireAuth, checkUser } = require("../middleware/authMiddleware");

const router = express.Router();

router.get('/', (req, res) => {
   //Checks if user is already authenticated
   if ('isAuthenticated' in res.locals) {
      if (res.locals.isAuthenticated === true) {
         return res.redirect(`/home/${res.locals.user.name}`);
      }
   }

   const errorType = req.query.error;
   let errorMessage = null;

   //Registration errors
   if (errorType === 'email_exists') {
      errorMessage = 'Email already exists';
   } 
   
   else if (errorType === 'passwords_no_match') {
      errorMessage = "Passwords do not match";
   }

   //Login errors
   else if (errorType === 'password_incorrect') {
      errorMessage = 'Password is incorrect';
   }

   // Misc errors
   else if (errorType === 'database_error') {
      errorMessage = 'Database Error';
   }

   else if (errorType === 'username_exists') {
      errorMessage = 'Username already exists'
   }

   else if (errorType === 'pass_or_email_incorrect') {
      errorMessage = 'Email or password incorrect'
   }

   res.render('index', { error_msg: errorMessage });
});

module.exports = router;