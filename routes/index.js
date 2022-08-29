const express = require('express');
const router = express.Router();
//w
const request = require('request');
//const token = process.env.token; // environment token //DEPLOY: needs to be made
const passport = require('passport');
const rootURL = 'https://api.github.com/'; // for API

/* GET home page. */
router.get('/', function(req, res, next) { // index with an API
  const username = req.query.username;
  const options = {
    url: `${rootURL}users/${username}`,
    headers: {
      'User-Agent': 'bijikyu'//,
      /*Authorization: `token ${token}`*/
    }
  };
  request(options, function(err, response, body) {
	  const userData = JSON.parse(body);
		options.url = userData.repos_url; // update the options url to fetch the user's repos
	  request(options, function(err, response, body) { //When consuming APIs, may be necessary for multiple requests to different endpoints to fetch all data before rendering (nested callbacks).
			if (body) {userData.repos = JSON.parse(body)}; // add a repos property
	    res.render('index', {userData});
  	});
  });
})

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));
// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/users',
    failureRedirect : '/users'
  }
));
// OAuth logout route
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/users');
});

/* router.get('/', (req, res, next) => { // regular index
  res.render('index');
}); */
router.get('/about', (req, res, next) => {
  res.render('about');
});
router.get('/contact', (req, res, next) => {
  res.render('contact');
});
router.get('/display', (req, res, next) => {
  res.render('display');
});
router.get('/error', (req, res, next) => {
  res.render('error', { error: req.query.error });
});
router.get('/location', (req, res, next) => {
  res.render('location');
});
router.get('/offering', (req, res, next) => {
  res.render('offering');
});
router.get('/show', (req, res, next) => {
  res.render('show');
});
router.get('/users', (req, res, next) => {
  res.redirect('/');
});

module.exports = router;