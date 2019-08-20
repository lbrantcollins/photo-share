require('dotenv').config();

// node packages
const express 			= require("express");
const bodyParser 		= require("body-parser");
const methodOverride = require("method-override");
const session 			= require('express-session');

// use express
const app 				= express();

// port for server: localhost:PORT/
const PORT = 3000;

// bring in the database setup
require("./db/db");

// middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use (methodOverride("_method"));

// set up parameters for the user session
app.use(session({
  secret: process.env.SESSION_SECRET, // bring this in from outside
                                      // don't type random strings
  resave: false,
  saveUninitialized: false // Good practice!  (legally required?)
}))

// landing page. we don't need a controller
app.get('/', (req, res) => {
  res.render('index.ejs');
});

// default URLs for controllers
const photosController = require("./controllers/photos.js");
app.use("/photos", photosController);
const usersController = require("./controllers/auth.js");
app.use("/auth", usersController);

// start up the server at localhost:PORT/
app.listen(PORT, () => {
  const d = new Date()
  console.log(d.toLocaleString() + ' server is running on port ' + PORT)
  console.dir(process.env)
})

