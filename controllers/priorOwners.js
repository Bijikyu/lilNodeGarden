const PriorOwner = require('../models/priorOwner');

function newPriorOwner(req, res) {
	PriorOwner.find({}, function(err, priorOwners) {
		if (err) {
			console.log(err);
		} else {
			res.render('priorOwners/new', { title: 'New Prior Owner', priorOwners });
		}
	});
}

function create (req, res) {
	for (let key in req.body) { // remove empty properties
			if (req.body[key] === '') {delete req.body[key]};
	}
	const priorOwner = new PriorOwner(req.body);
	priorOwner.save(function(err) {
			if (err) {
					console.log(err);
			} else {
					res.redirect('/priorOwners/new', { title: 'New Prior Owner', priorOwners });
			}
	});
}

module.exports = {
	new: newPriorOwner,
	create
}
