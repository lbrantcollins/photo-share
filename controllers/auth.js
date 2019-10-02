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
	console.log("inside register post route");

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
				password: password,
				name: req.body.name
			})
			// set user to logged in status
			req.session.loggedIn = true;
			req.session.username = createdUser.username;
      req.session.userId = createdUser._id;
			req.session.name = createdUser.name;
			req.session.message = "Thanks for signing up, " + req.session.name + ".";
			req.session.status = "good";
			// redirect to home
			res.redirect('/freephotos');
		}

	} catch(err) {
		next(err);
	}

})


router.post('/login', async (req, res, next) => {
  // check username password

  const user = await User.findOne({username: req.body.username})

  // if !user
  if(!user) {
    console.log("user does not exist");
    // session msg inval user or pass
    req.session.message = "invalid username or password"
    req.session.status = "bad";
    // redirect auth
    res.redirect('/auth/login')

  }
  // else (user exists)
  else {
    // if good pw
    if(bcrypt.compareSync(req.body.password, user.password)==true) {
      // log in
      req.session.loggedIn = true
      req.session.username = user.username
      req.session.userId = user._id;
      req.session.name = user.name
      req.session.message = "Welcome back, " + req.session.name + ".";
      req.session.status = "good";
      console.log("user successfully logged in");
      // redirect home
      res.redirect('/users/' + user._id) 
    }
    // else (bad pw)
    else {
      console.log("bad password");
      // session msg inval user or pass
      req.session.message = "invalid username or password"
      req.session.status = "bad";
      // redirect auth
      res.redirect('/auth/login')
    }

  }

})

// logout
router.get('/logout', (req, res, next) => {
  console.log("----> inside logout route <----");
  req.session.destroy((err, data) => {
    if(err) next(err);
    else {
      res.redirect('/')
    }
  })
})

module.exports = router;

