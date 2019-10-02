require('dotenv').config();

// node packages
const express 			= require("express");
const bodyParser 		= require("body-parser");
const methodOverride = require("method-override");
const session 			= require('express-session');

// use express
const app 				= express();

// port for server: localhost:PORT/
// const PORT = 3000;
const PORT = process.env.PORT || 3000;

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

// custom middleware to help with handling user auth messages
app.use( (req, res, next) => {
	console.log("custom middleware is running");
	console.log("req.session ------>\n", req.session);
	console.log("req.session.userId ---> ", req.session.userId);
	// vars stored in res.locals are avail in any ejs when rendered
	res.locals.loggedIn = req.session.loggedIn;
	res.locals.admin = req.session.admin;
	res.locals.username = req.session.username;
	res.locals.userId = req.session.userId;
	res.locals.name = req.session.name;

	if(req.session.message) {
		res.locals.message = req.session.message;
		res.locals.status = req.session.status;
	} else {
		res.locals.message = undefined;
		res.locals.status = undefined;
	}

	req.session.message = undefined;
	req.session.status = undefined;

	next();
})


// landing page. we don't need a controller
app.get('/', (req, res) => {
  res.render('index.ejs');
});

// default URLs for controllers
const photosController = require("./controllers/photos.js");
app.use("/photos", photosController);
const freephotosController = require("./controllers/freephotos.js");
app.use("/freephotos", freephotosController);
const authController = require("./controllers/auth.js");
app.use("/auth", authController);
const usersController = require("./controllers/users.js");
app.use("/users", usersController);

// start up the server at localhost:PORT/
app.listen(PORT, () => {
  const d = new Date()
  console.log(d.toLocaleString() + ' server is running on port ' + PORT)
  console.dir(process.env)
})

