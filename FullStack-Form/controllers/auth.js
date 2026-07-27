//Module use for connection an queries to the database
const mysql = require("mysql");
const jwt = require('jsonwebtoken');
//Module used to encrypt user passwords
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
   host: process.env.DATABASE_HOST,
   user: process.env.DATABASE_USER,
   password: process.env.DATABASE_PASSWORD,
   database: process.env.DATABASE,
});

db.connect((err) => {
   if (err) {
      console.error(`Failed to connect: ${err}`);
   } else {
      console.log('Connected to MYSQL');
   }
})



//Register user function
exports.register = (req, res) => {

   //Stored registration info
   const form_info = {
      'username': req.body["username"],
      'email': req.body["email"],
      'password': req.body["password"],
      'confirm-password': req.body["confirm-password"],
      'account-type': req.body['account-type'],
   };

   //DB query to check if email already is within database
   db.query('SELECT email FROM users WHERE email = ?', [form_info['email']], async (err, results) => {
      //Returns if some error during query happens
      if (err) {
         console.log(err);
         return res.redirect('/?error=database_error');
      }
      //Error if email already is registered
      if (results.length > 0) {
         console.error('Email is already in use')
         return res.redirect('/?error=email_exists');
      } 
      
      //Error if passwords do not match
      if (form_info['password'] !== form_info['confirm-password']) {
         console.error('Passwords do not match')
         return res.redirect('/?error=passwords_no_match');
      }

      //Encrypts user's password
      let hashedPassword = await  bcrypt.hash(form_info['password'], 8);

      //Registers the user into the database if matches all criteria
      const sql = `INSERT INTO users (name, email, password, account_type) VALUES (?, ?, ?, ?)`;
      const values = [
         form_info['username'],
         form_info['email'],
         hashedPassword,
         form_info['account-type']
      ];

      //Returns if some error occurs during query
      db.query(sql, values, (err, results) => {
         if (err) {
            console.log(err);
            return res.redirect('/?error=database_error');
            console.error('Failed to register user into database');
         }

         //Send a plain response to front-end
         return res.redirect('/home');
         console.log('Registered');
      });
   });
};



exports.login = (req, res) => {
   const form_info = {
      'email': req.body["email"],
      'password': req.body["password"],
   };

   db.query(`SELECT email, password FROM users WHERE email = ?`, [form_info['email']], async (err, results) => {
      if (err) {
         console.error(err);
         return res.redirect('/?error=database_error');
      }

      //Email is not registered
      if (results < 0) {
         return res.redirect('/?error=user_not_found');
      }

      const user = results[0];

      const user_info = { 
         'email': user['email'],
         'password': user['password'],
      }  

      const passMatch = await bcrypt.compare(form_info['password'], user_info['password']);
   
      if (!passMatch) {
         return res.redirect('/?error=password_incorrect');
      }

      res.redirect('/home');
   });
}