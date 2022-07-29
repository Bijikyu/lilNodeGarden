var express = require('express');
var router = express.Router();
const usersCtrl = require('../controllers/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/facts', isLoggedIn, usersCtrl.addFact);

function isLoggedIn(req, res, next) { //middleware that checks if authorized before calling control function
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}

module.exports = router;