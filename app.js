"use strict"

var express = require('express');
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var bodyParser = require('body-parser');
var morgan = require("morgan");
var pug = require("pug");
var passport = require("passport");


//mongoose
var mongoose = require("mongoose");

//sessions
var session = require("express-session");
var MongoStore = require("connect-mongo")(session);

//, data.json and seeder
var seeder = require("mongoose-seeder");
var data = require("./src/data/data.json");

//reuire our routes
var index = require('./src/routes/index');
var users = require('./src/routes/users');
var api = require("./src/routes/api");
var cart = require("./src/routes/cart");
require('./config/passport');

var app = express();

/** 
Connect to the database
**/
mongoose.connect("mongodb://localhost:27017/webshop");
require("./config/passport.js");
var db = mongoose.connection;

db.on("error", console.error.bind(console,"connetion error"));

db.once("open", function() {
    seeder.seed(data).then(function(){
    console.log("the data has been seeded");
    }).catch(function(err) {
    // handle error
        console.log(err);
    }); 
});


//Set the port 
app.set("port", process.env.PORT || 5000);

// view engine setup
app.set('view engine', 'pug');
app.set('views', "./public/views");

// morgan gives us http request logging
app.use(morgan('dev'));

// setup our static route to serve files from the "public" folder
app.use("/", express.static('public'));

app.use(bodyParser.json());
//The body-parser middleware parse the form body into server side variable req.body.
app.use(bodyParser.urlencoded({ extended: false }));

// Use the session middleware
app.use(session({ 
             secret: 'keyboard cat', 
     //       resave: false, //don't save session if unmodified 
  // saveUninitialized: false, // don't create session until something stored 
              store: new MongoStore({mongooseConnection: mongoose.connection}),
             cookie: {maxAge: 180 * 60 * 1000} 
}));

//middleware for the session to be reached too all views
app.use(function(req,res,next){
  res.locals.session = req.session;
  next();
})

//Initialize passport
app.use(passport.initialize());
app.use(passport.session());


//Setup for our routes
app.use('/', index);
app.use('/users', users);
app.use("/api", api);
app.use("/cart", cart);


// catch 404 and forward to global error handler
app.use(function(req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// Express's global error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// start listening on our port
var server = app.listen(app.get('port'), function() {
  console.log('Express server is listening on port ' + server.address().port);
});

module.exports = app; 