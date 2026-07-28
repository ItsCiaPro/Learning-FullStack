//Modules
const express = require("express");
const path = require("path");
const { url } = require("inspector");
const hbs = require('hbs');

//Hbs helpers
hbs.registerPartials(path.join(__dirname, '/views/partials'))

//And comparator
hbs.registerHelper('and', function (a,b) {
   return a && b;
});

const app = express();

// Middleware for the reading of URL-encoded forms
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Declaration of public view directory for express
const publicDirectory = path.join(__dirname, "/public");
app.use(express.static(publicDirectory));

app.set('view engine', 'hbs');

app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));
app.use('/home', require('./routes/home'));

app.use((req, res) => {
    res.status(404).send('<h1>Error 404</h1>');
});

//Port definition
app.listen(5000, () => {
   console.log("Server started on Port 5000");
})