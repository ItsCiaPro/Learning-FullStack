const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");

const app = express();

const db = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: '',
   database: 'nodejs_login',
})

db.connect( (error) => {
   if (error) {
      console.log(error)
   } else {
      console.log("MYSQL Connected...")
   }
})

app.get("/", (req, res) => {
   res.send("<h1>HAHAHAAHAH</h1>");
})

app.get("/secret", (req, res) => {
   res.send("<h1>you got a friend in me</h1>");
})

app.listen(5000, () => {
   console.log("Server started on Port 5000");
})