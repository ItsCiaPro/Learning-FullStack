//Modules
const express = require("express");
const path = require("path");
const mysql = require("mysql");
const dotenv = require("dotenv");
const { url } = require("inspector");
const hbs = require('hbs');

//Hbs helpers
hbs.registerPartials(path.join(__dirname, '/views/partials'))

//And comparator
hbs.registerHelper('and', function (a,b) {
   return a && b;
});

dotenv.config({ path: './.env'});

const app = express();

// Middleware for the reading of URL-encoded forms
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Db connection creation
const db = mysql.createConnection({
   host: process.env.DATABASE_HOST,
   user: process.env.DATABASE_USER,
   password: process.env.DATABASE_PASSWORD,
   database: process.env.DATABASE,
});

//Declaration of public view directory for express
const publicDirectory = path.join(__dirname, "/public");
app.use(express.static(publicDirectory));

app.set('view engine', 'hbs');

//Db connection
db.connect( (error) => {
   if (error) {
      console.log(error);
   } else {
      console.log("MYSQL Connected...");
   }
});

app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));
app.use('/home', require('./routes/home'))

//Port definition
app.listen(5000, () => {
   console.log("Server started on Port 5000");
})