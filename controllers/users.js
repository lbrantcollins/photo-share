const express = require("express");
const router = express.Router();

const User = require("../models/user.js");
const Photo = require("../models/photo.js")

// // populate the database with starter data
// const photoData = require("../models/photoData.js")
// Photo.insertMany(photoData, (err, docs) => {
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		console.log("multiple docs added to empty db");
// 	}
// })



// index route
router.get("/", (req, res, next) => {
	User.find({}, (err, usersFound) => {
		if (err) next(err);
		else {
			res.render("./users/index.ejs", {
				users: usersFound
			})

		}
	})
})

// new route
router.get("/new", (req, res) => {
	res.render("./users/new.ejs")
})

// create route
router.post("/", (req, res, next) => {
	User.create(req.body,
		(err, userAdded) => {
			if (err) next(err);
			else {
				console.log("CREATE: ", req.body);
				res.redirect("/users");
			}	
		})
})

// show route
router.get("/:id", (req, res, next) => {
	User.findById(req.params.id, (err, userFound) => {
		if (err) next(err);
		else {
			console.log("userFound in show route:", userFound);
			Photo.find({user: userFound.id}, (err, photosFound) => {
				res.render("./users/show.ejs", {
					user: userFound,
					photos: photosFound
				})
			})
		}
	})
})


// No edit route written for users.
// So, user cannot change name. :(
// All other (13) routes are 
// written, tested, and completed.  :)

// delete route
router.delete("/:id", (req, res, next) => {
	console.log("req.body inside delete route");
	User.findOneAndDelete(req.params.id,
		(err, userDeleted) => {
			if (err) next(err);
			else {
				console.log("User in delete route:", userDeleted);
				Photo.remove({user: req.params.id}, 
					(err2, docs) => {
						if (err2) next(err2);
						else {
							res.redirect("/users");

						}

				})
			}
		})
})

module.exports = router;
