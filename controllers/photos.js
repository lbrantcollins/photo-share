const express = require("express");
const router = express.Router();

const Photo = require("../models/photo.js");
const User = require("../models/user.js");

const requireAuth = require('../lib/requireAuth')

// router-level custom middleware that will block
// block this specific controller to those who aren't logged in

router.use(requireAuth)

// That is, if not logged in, cannot hit these routes:
// new/create, edit/update, destroy

// the other two routes (index, show) are in photos.js controller




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
      res.render('./photos/new.ejs', {
        users: allUsers
      });

    }
  })

});


// create route
///////////////////////////////////////////////////
router.post("/:id", (req, res, next) => {
	const newPhoto = {
		user: req.params.id,
		title: req.body.title,
		description: req.body.description,
		url: req.body.url
	}
	Photo.create(newPhoto,
		(err, photoAdded) => {
			if (err) next(err);
			else {
				console.log("CREATE: ", req.body);
				res.redirect("/users/" + req.params.id);
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
				console.log("photoFound in photos edit route");
				console.log(photoFound);
				res.render("./photos/edit.ejs", {
					photo: photoFound
				})
			}
	})
})

// update route
///////////////////////////////////////////////////
router.put("/:id", (req, res, next) => {
	const payload = {
		user: req.session.userId,
		url: req.body.url,
		title: req.body.title,
		description: req.body.description
	}
	Photo.findByIdAndUpdate(req.params.id,
		payload, (err, photoFound) => {
			if (err) next(err);
			else {
				res.redirect("/users/" + photoFound.user._id);
			}
		})
})

// delete route
///////////////////////////////////////////////////
router.delete("/:id", (req, res, next) => {
	Photo.findByIdAndDelete(req.params.id)
		.populate('user')
		.exec((err, photoDeleted) => {
			if (err) next(err);
			else {
				res.redirect("/users/" + photoDeleted.user._id);
			}
		})
})

module.exports = router;
