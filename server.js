const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const app = express();

require("./db/db.js");

//middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use (methodOverride("_method"));

const photosController = require("./controllers/photos.js");
app.use("/photos/", photosController);

app.listen(3000, () => {
	console.log("listening... on port 3000");
})

