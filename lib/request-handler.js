var request = require('request');
var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var util = require('../lib/utility');

var db = require('../db/config');
// var User = require('../app/models/user');
// var Link = require('../app/models/link');

exports.renderIndex = function(req, res) {
  res.render('index');
};

exports.signupUserForm = function(req, res) {
  res.render('signup');
};

exports.loginUserForm = function(req, res) {
  res.render('login');
};

exports.logoutUser = function(req, res) {
  req.session.destroy(function(){
    res.redirect('/login');
  });
};

exports.fetchLinks = function(req, res) {
  db.Url.find({}, function(err, results){
    res.send(200, results);
  });
};

exports.saveLink = function(req, res) {
  var uri = req.body.url;

  if (!util.isValidUrl(uri)) {
    console.log('Not a valid url: ', uri);
    return res.send(404);
  }


  db.urls.find({url: uri}, function(err, url){
    if( url.length ){
      res.send(200, url[0]);
    }else{
      util.getUrlTitle(uri, function(err, title) {
        if (err) {
          console.log('Error reading URL heading: ', err);
          return res.send(404);
        }
        var link = new db.Urls({
          url: uri,
          title: title,
          base_url: req.headers.origin
        });

        link.save(function(err, urls) {
          res.send(200, urls);
        });
      });
    }
  });
};

exports.loginUser = function(req, res) {
  db.Users.find({username: req.body.username}, function(err, user){
    if( user.length ){
      util.comparePassword(req.body.password, user[0].password, function(found){
        if(found){
          // might change to just user
          util.createSession(req,res,user[0]);
        }else{
          res.redirect('/login');
        }
      });
    }else{
      console.log('Login failed: user does not exist');
      res.redirect('/login');
    }
  });
};

exports.signupUser = function(req, res) {
  db.Users.find({username: req.body.username}, function(err, user){
    if( user.length ){
      console.log('user already exists');
      res.redirect('/signup');
    }else{
      var newUser = db.Users({username: req.body.username, password: req.body.password});
      newUser.save(function(err, newUser){
        util.createSession(req, res, newUser);
      });
      res.redirect('/');
    }
  });
};

exports.navToLink = function(req, res) {
  db.Urls.find({code: req.params[0]}, function(err, urls){
    if( user.length ){
      urls[0].visits++;
      urls[0].save();
      return res.redirect(urls[0].url);
    }else{
      res.redirect('/');
    }
  });
};
