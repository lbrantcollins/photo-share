const mongoose = require("mongoose");

const userSchema = mongoose.Schema( {
	user: {
		type: String,
		required: true
	}
});

const UserModel = new mongoose.model("User", userSchema)

module.exports = UserModel;