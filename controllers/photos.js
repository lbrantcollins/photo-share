const express = require("express");
const router = express.Router();

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
	PhotoModel.find({}, (err, photosFound) => {
		if (err) next(err);
		else {
			res.render("./photos/index.ejs", {
				photos: photosFound
			})

		}
	})
})

// show route
router.get("/:id", (req, res, next) => {
	PhotoModel.findById(req.params.id, (err, photoFound) => {
		if (err) next(err);
		else {
			console.log("photoFound:", photoFound);
			res.render("./photos/show.ejs", {
				photo: photoFound
			})
		}
	})
})


module.exports = router;
