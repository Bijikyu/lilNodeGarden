const Item = require('../models/user');

function addFact(req, res, next) {
    req.user.facts.push(req.body);
    req.user.save(function(err) {
      res.redirect('/students');
    });
}

module.exports = {
    addFact
};