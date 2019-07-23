const mongoose = require("mongoose");
require("mongoose-type-url")

const photoSchema = mongoose.Schema( {
	username: {
		type: String,
		required: true
	},
	location: String,
	description: String,
	url: {
		type: mongoose.SchemaTypes.Url,
		required: true
	}
});

const PhotoModel = new mongoose.model("Photo", photoSchema)

module.exports = PhotoModel;