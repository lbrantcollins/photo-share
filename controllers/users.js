const express = require("express");
const router = express.Router();

const UserModel = require("../models/user.js");
const PhotoModel = require("../models/photo.js")

// // populate the database with starter data
// const photoData = require("../models/photoData.js")
// PhotoModel.insertMany(photoData, (err, docs) => {
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		console.log("multiple docs added to empty db");
// 	}
// })

// index route
router.get("/", (req, res, next) => {
	UserModel.find({}, (err, usersFound) => {
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
	UserModel.create(req.body,
		(err, userAdded) => {
			if (err) next(err);
			else {
				console.log("CREATE: ", req.body);
				res.redirect("/users");
			}	
		})
})

// // show route
// router.get("/:id", (req, res, next) => {
// 	PhotoModel.findById(req.params.id, (err, photoFound) => {
// 		if (err) next(err);
// 		else {
// 			console.log("photoFound:", photoFound);
// 			res.render("./photos/show.ejs", {
// 				photo: photoFound
// 			})
// 		}
// 	})
// })


// // edit route
// router.get("/:id/edit", (req, res, next) => {
// 	PhotoModel.findById(req.params.id, (err, photoFound) => {
// 		if (err) next(err);
// 		else {
// 			res.render("./photos/edit.ejs", {
// 				photo: photoFound
// 			})
// 		}
// 	})
// })

// // update route
// router.put("/:id", (req, res, next) => {
// 	PhotoModel.findByIdAndUpdate(req.params.id,
// 		req.body, (err, photoFound) => {
// 			if (err) next(err);
// 			else {
// 				console.log("photoFound: ", photoFound);
// 				res.redirect("/photos");
// 			}
// 		})
// })

// // delete route
// router.delete("/:id", (req, res, next) => {
// 	console.log("inside delete route");
// 	PhotoModel.findByIdAndDelete(req.params.id,
// 		(err, photoDeleted) => {
// 			if (err) next(err);
// 			else {
// 				console.log("Delete route:", photoDeleted);
// 				res.redirect("/photos");
// 			}
// 		})
// })

module.exports = router;
