const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 5000;

// Static Files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));

// Templating Engine
app.set('views', './app/views');
app.set('view engine', 'ejs');

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


// Routes
const moviesRouter = require('./app/routes/movies.routes');
const commentsRouter = require('./app/routes/comments.routes');

app.use('/', moviesRouter);
app.use('/movie', moviesRouter);


// set port, listen for requests
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});