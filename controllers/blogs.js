const Blog = require('../models/blog');
const User = require('../models/user');

function create (req, res) {
    if (req.user !== undefined) {
        req.body.author = req.user.name;
        req.body.authorEmail = req.user.email;
    }
    const blog = new Blog(req.body);
    blog.save(function(err) {
        if (err) {
            console.log(err);
            res.redirect('error', { error: err } );
        } else {
            res.redirect('blogs');
            //res.render(`blogs/${blog.id}`);
        }
    });
}

function deleteBlog(req, res) {
    Blog.findById(req.params.id, function(err, blog) {
        if (err) { res.render('error', {error: err})};
        if (blog.createdBy) {
            if (!blog.createdBy.equals(req.user._id)){
                res.redirect('blogs');
            }
        } else {
            Blog.findByIdAndDelete(req.params.id, function(err){
                if (err) { res.render('error', {error: err})};
                res.redirect('blogs');
            });
        }
    })
}

function edit(req, res) {
    Blog.findById(req.params.id, function(err, blog){
        /*if(!blog.createdBy.equals(req.user._id)){ 
            return res.redirect(`/blogs/${blog.id}`);
        }
        else {*/        
            if (err) {
                console.log(err);
                return res.redirect(`/blogs/${blog.id}`); 
            }
            res.render('blogs/edit', { blog });
        //}
   });
}

function index (req, res) {
    /*if(!req.user){ //uncomment to enable view of only owned blogs
        res.redirect('/');
    }
    else{*/
        Blog.find({})
        .sort({ createdAt: 'asc' })
        .exec(
        function(err, blogs){
            //if (err) return res.redirect('/blogs');
            res.render('blogs', {blogs: blogs});
        });
   // }
}

function newBlog(req, res) {
    /*if (req.session.userId) {res.render('blogs/new');}
    res.redirect('/');*/
    res.render('blogs/new');
}

function show(req, res) {
    Blog.findById(req.params.id)
    .populate('comments')
    .exec(
    function(err, blog){
        if (err) return res.redirect('/blogs');
        res.render('blogs/show', { blog });
    });
}

function update(req, res) {
    Blog.findByIdAndUpdate(req.params.id, req.body, function(err, blog){
        if (err) {res.render('blogs/new', { blog })};
        res.redirect(`/blogs/${req.params.id}`); 
    }); 
}

module.exports = {
	create,
	delete: deleteBlog,
	edit,
    index,
    new: newBlog,
	show,
	update
};