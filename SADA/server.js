/**
 * Created by rodri on 10-09-2016.
 */
// server.js

// set up ======================================================================
// get all the tools we need
var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app = express();
var port = process.env.PORT || 8080;

var passport = require('passport');
var flash = require('connect-flash');
var validator = require('express-validator');
var favicon = require('serve-favicon');
var path = require('path');

// configuration ===============================================================
// connect to DB
var mysql = require('mysql');
var dbconfig = require("./config/database");
var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);

//mail theBrutalCorp
var nodemailer = require('nodemailer');
var author = require('./config/auth_mail');
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: author.auth
})

//Passport
require('./config/passport')(passport, connection, dbconfig); // pass passport for configuration

// set up express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// ../
app.use(express.static(path.join(__dirname, 'scripts')));
app.use(express.static(path.join(__dirname, 'public')));

//validator
app.use(validator());

app.set('view engine', 'ejs'); // set up ejs for templating
app.use(favicon(__dirname + '/public/img/icon1.ico'));

// required for passport
app.use(session({
    secret: 'vidyapathaisalwaysrunning',
    resave: true,
    saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// routes ======================================================================
require('./app/routes2.js')(app, passport, connection, transporter,dbconfig); //pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('Running on port: ' + port);
