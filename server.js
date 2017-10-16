var express = require('express');
var path = require('path');

require('dotenv').config()

var app = express();
var port = process.env.PORT || 3001;
var mongoURI = process.env.MONGODB_URI;
var sessionSecret = process.env.SESSION_SECRET;

var mongoose = require('mongoose')
var passport = require('passport')
var flash = require('connect-flash')

var morgan = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var session = require('express-session')

// connect to our database
mongoose.connect(mongoURI);

// pass passport for configuration
require('./config/passport')(passport); 

// set up our express application
app.use(morgan('dev')) // log every request to the console
app.use(cookieParser()) // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// middleware required for passport
app.use(session({ 
	secret: sessionSecret,
	resave: false,
	saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session()) // persistent login sessions
app.use(flash()) // use connect-flash for flash messages stored in session

// load our routes and pass in our app and fully configured passport
require('./config/routes.js')(app, passport)

app.listen(port)
console.log('Listening on port ' + port)
