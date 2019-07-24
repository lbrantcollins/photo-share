const mongoose = require("mongoose");
require("mongoose-type-url");

const photoSchema = mongoose.Schema( {
	user: {
    	type: mongoose.Schema.Types.ObjectId,  // user._id
    	ref: 'User'
  	},
	title: String,
	description: String,
	url: {
		type: mongoose.SchemaTypes.Url,
		required: true
	}
});

const PhotoModel = new mongoose.model("Photo", photoSchema)

module.exports = PhotoModel;