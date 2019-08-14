const express 	= require("express");
const router 	= express.Router();
const bcrypt 	= require("bcryptjs");

const User 		= require("../models/user.js");

// login page
router.get('/login', (req, res) => {
	res.render('auth/login.ejs');
})

// register page
router.get('/register', (req, res) => {
	res.render('auth/register.ejs');
})

// register post route (create a new user)
router.post('/register', async (req, res, next) => {

	try {
		// check if username already exists
		const usersWithThatName = await User.find({username: req.body.username});
		if(usersWithThatName.length > 0) {
			// username is already taken
			req.session.message = "That username is already taken."
			req.session.status = "bad"
			// redirect to the registration page
			res.redirect('auth/register')
		}

		// if username NOT taken, then OK to register
		else {
			// hash password
			const password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
			const createdUser = await User.create({
				username: req.body.username,
				password: password
			})
			// set user to logged in status
			req.session.loggedIn = true;
			req.session.username = createdUser.username;
			req.session.message = "Thanks for signing up, " + createdUser.username + ".";
			req.session.status = "good";
			// redirect to home
			res.redirect('/');
		}

	} catch(err) {
		next(err);
	}

})
