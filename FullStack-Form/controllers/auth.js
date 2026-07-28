//Module use for connection an queries to the database
const jwt = require('jsonwebtoken');
//Module used to encrypt user passwords
const bcrypt = require('bcryptjs');

const db = require('../db.js');


//Register user function
exports.register = async (req, res) => {

   //Stored registration info
   const form_info = {
      'username': req.body["username"],
      'email': req.body["email"],
      'password': req.body["password"],
      'confirm-password': req.body["confirm-password"],
      'account-type': req.body['account-type'],
   };

   const name_query = `SELECT name FROM users WHERE name = '${form_info['username']}'`;
   const name_result = await db.fetchQuery(name_query);

   if (name_result !== null) {
      console.error('Username is already in use');
      return res.redirect('/?error=username_exists');
   }

   //DB query to check if email already is within database
   const email_query = `SELECT email FROM users WHERE email = '${form_info['email']}'`;
   const email_result = await db.fetchQuery(email_query);

   //Error if email already is registered
   if (email_result !== null) {
      console.error('Email is already in use');
      return res.redirect('/?error=email_exists');
   }

   //Error if passwords do not match
   if (form_info['password'] !== form_info['confirm-password']) {
      console.error('Passwords do not match');
      return res.redirect('/?error=passwords_no_match');
   }

   //Encrypts user's password
   let hashedPassword = await  bcrypt.hash(form_info['password'], 8);

   //Registers user into database
   const register_query = `INSERT INTO users (name, email, password, account_type) VALUES ('${form_info['username']}', '${form_info['email']}', '${hashedPassword}', '${form_info['account-type']}')`;

   const error = await db.sendQuery(register_query);

   if (error) {
      return res.redirect('/?error=database_error');
   }

   return res.redirect(`/home/${form_info['username']}`)
}



exports.login = async (req, res) => {
   const form_info = {
      'email': req.body["email"],
      'password': req.body["password"],
   };

   const login_query = `SELECT name, email, password FROM users WHERE email = '${form_info['email']}'`;
   const login_result = await db.fetchQuery(login_query);

   if (login_result === null) {
      return res.redirect('/?error=user_not_found');
   }

   const passMatch = await bcrypt.compare(form_info['password'], login_result['password']);

   if (!passMatch) {
      return res.redirect('/?error=password_incorrect');
   }

   const user_home_route = `/home/${login_result['name']}`
   res.redirect(user_home_route);
}