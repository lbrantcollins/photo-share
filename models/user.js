const mongoose = require("mongoose");

const userSchema = mongoose.Schema( {
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
});

const UserModel = new mongoose.model("User", userSchema)

module.exports = UserModel;