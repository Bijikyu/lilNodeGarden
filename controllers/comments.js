const Blog = require('../models/blog');
const User = require('../models/user');

module.exports = {
	create,
	delete: deleteComment,
};

function create(req, res) {
	Blog.findById(req.params.id, function(err, blog) {
		//req.body.author = req.user.username;
		req.body.author = 'Fred';
		if (err) {
			console.log(err);
			res.render('error', { error: err });
		} else {
			blog.comments.push(req.body);
			blog.save(function(err) {
				res.redirect(`/blogs/${req.params.id}`);
			});
		};
	});
};


function deleteComment(req, res) {
	Blog.findOne({'comments._id': req.params.id}, function(err, blog) {
		const commentSubdoc = blog.comments.id(req.params.id); 
		if (err) {
			res.render('error', { error: err });
		} /* else if (user.role === 'Admin') {
			commentSubdoc.remove();
			blog.save(function(err) {
				res.redirect(`/blogs/${req.params.id}`);
			});
		} else if (!commentSubdoc.userId.equals(req.user._id)) {
			res.redirect('back');
		} */ else {
			commentSubdoc.remove();
			blog.save(function(err) {
				if (err) {
					res.render('error', { error: err });
				} else {
					res.redirect(`back`);
				}
			});
		};
	});
};
