const express = require("express");
const router = express.Router();

const Photo = require("../models/photo.js");
const User = require("../models/user.js");

//////////////////////////////////////////////////////////////
// These two routes (index, show) are avail to anyone (not just logged-in users)
//////////////////////////////////////////////////////////////

// index route
router.get("/", (req, res, next) => {
	Photo.find({}, (err, photosFound) => {
		if (err) next(err);
		else {
			res.render("./photos/index.ejs", {
				photos: photosFound
			})
			console.log("\n photos info in index route for photos");
			console.log(photosFound);			
		}
	})
})


// show route
router.get("/:id", (req, res, next) => {
	Photo.findById(req.params.id)
	.populate('user')
	.exec((err, photoFound) => {
		if (err) next(err);
		else {
			console.log("photoFound:", photoFound);
			console.log("user:", photoFound.user);
			res.render("./photos/show.ejs", {
				photo: photoFound,
				loggedIn: req.session.loggedIn,
				userId: req.session.id
			})
		}
	})
})



module.exports = router;
