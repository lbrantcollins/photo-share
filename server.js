const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const app = express();

require("./db/db.js");

//middleware
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use (methodOverride("_method"));

const photosController = require("./controllers/photos.js");
app.use("/photos", photosController);

const usersController = require("./controllers/users.js");
app.use("/users", usersController);

// landing page. we don't need a controller
app.get('/', (req, res) => {
  res.render('index.ejs');
});


app.listen(3000, () => {
	console.log("listening... on port 3000");
})

