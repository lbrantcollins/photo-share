const mongoose = require("mongoose");
require("mongoose-type-url")

const photoSchema = mongoose.Schema( {
	username: {
		type: String,
		required: true
	},
	title: String,
	description: String,
	url: {
		type: mongoose.SchemaTypes.Url,
		required: true
	}
});

module.exports = photoSchema;