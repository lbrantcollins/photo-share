const express = require("express");
const router = express.Router();

const Photo = require("../models/photo.js");
const User = require("../models/user.js");

// const requireAuth = require('../lib/requireAuth')

// router-level custom middleware that will block
// block this specific controller to those who aren't logged in

// router.use(requireAuth)

// That is, if not logged in, cannot hit these routes:
// new/create, edit/update, destroy

// the other two routes (index, show) are in photos.js controller

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






// new route
///////////////////////////////////////////////////
// router.get("/new", (req, res) => {
// 	res.render("./photos/new.ejs")
// })
router.get('/new', (req, res, next) => {
  // We'll have to find all the users
  // so we can list them in a dropdown
  User.find({}, (err, allUsers) => {
    if(err) next(err);
    else {
      console.log(allUsers, "< -- new route in photos ")
      console.log('users array ^^^^^^^^^^^^^');
      res.render('./photos/new.ejs', {
        users: allUsers
      });

    }
  })

});

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
				user: photoFound.user
			})
		}
	})
})



// create route
///////////////////////////////////////////////////
router.post("/", (req, res, next) => {
	Photo.create(req.body,
		(err, photoAdded) => {
			if (err) next(err);
			else {
				console.log("CREATE: ", req.body);
				res.redirect("/photos");
			}	
		})
})

// edit route
///////////////////////////////////////////////////
router.get("/:id/edit", (req, res, next) => {
	Photo.findById(req.params.id)
		.populate('user')
		.exec((err, photoFound) => {
			if (err) next(err);
			else {
				res.render("./photos/edit.ejs", {
					photo: photoFound
				})
			}
	})
})

// update route
///////////////////////////////////////////////////
router.put("/:id", (req, res, next) => {
	Photo.findByIdAndUpdate(req.params.id,
		req.body, (err, photoFound) => {
			if (err) next(err);
			else {
				console.log("photoFound: ", photoFound);
				res.redirect("/photos");
			}
		})
})

// delete route
///////////////////////////////////////////////////
router.delete("/:id", (req, res, next) => {
	console.log("inside delete route");
	Photo.findByIdAndDelete(req.params.id)
		.populate('user')
		.exec((err, photoDeleted) => {
			if (err) next(err);
			else {
				console.log("\nDelete route photo:", photoDeleted);
				console.log("Delete route user:", photoDeleted.user._id);

				res.redirect("/users/" + photoDeleted.user._id);
			}
		})
})

module.exports = router;
