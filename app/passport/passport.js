var FacebookStrategy = require('passport-facebook').Strategy;
var User             =require('../models/user');
var session          =require('express-session')
var jwt              =require('jsonwebtoken'),
TwitterStrategy      = require('passport-twitter').Strategy;
var secret           ='harrypotter';
//var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
module.exports=function(app,passport){
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }//false coz it is not going to be used
  }))
  passport.serializeUser(function(user, done) {
    token=jwt.sign({username:user.username,email:user.email},secret,{expiresIn:'24h'});
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
  return passport;
 };
