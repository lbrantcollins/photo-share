module.exports = (req, res, next) => {
	if(!req.session.loggedIn) {
		req.session.message = "You must be logged in to do that.";
		req.session.status = "bad";
		res.redirect('auth/login');

	} else {
		next()
	}
}
