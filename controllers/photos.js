const express = require("express");
const router = express.Router();

const PhotoModel = require("../models/photo.js")

// populate the database with starter data
const photoData = require("../models/photoData.js")
PhotoModel.insertMany(photoData, (err, docs) => {
	if (err) {
		console.log(err);
	} else {
		console.log("multiple docs added to empty db");
	}
})



module.exports = router;
