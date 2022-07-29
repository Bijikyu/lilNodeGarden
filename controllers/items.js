const Item = require('../models/item');

function create (req, res) {
    req.body.active = !!req.body.active; // convert nowShowing's checkbox of nothing or "on" to boolean
    req.body.features = req.body.features.replace(/\s*,\s*/g, ','); // remove whitespace next to commas
    if (req.body.features) {req.body.features = req.body.features.split(',')}; // split if it's not an empty string
    for (let key in req.body) { // remove empty properties
        if (req.body[key] === '') {delete req.body[key]};
    }
    const item = new Item(req.body);
    item.save(function(err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('items');
        }
    });
}

function deleteItem(req, res) {
    /*Item.findById(req.params.id, function(err, item) { //uncomment to enable delete of only owned items
        if (!item.createdBy.equals(req.user._id)){
            res.redirect('/items');
        }
        else {*/
            Item.findByIdAndDelete(req.params.id, function(err){
                res.redirect('items');
            });
        }/*
    })
}*/

/*function edit(req, res) {
    Assignment.findById(req.params.id, function(err, assignment){
        /*if(!assignment.createdBy.equals(req.user._id)){ //uncomment to enable edit of only owned items
            return res.redirect('/items');
        }
        else {*/        
            /*if (err) return res.redirect('/items'); //uncomment to enable dedicated edit view
            res.render('items/edit', { 
				item: Item.getOne(req.params.id)
			});
        }/*
    });
}*/

function index(req, res) {
    /*if(!req.user){ //uncomment to enable view of only owned items
        res.redirect('/');
    }
    else{*/
        Item.find({}, function(err, items) {
            res.render('items', { items });
        });
   // }
}

function show(req, res) {
    Item.findById(req.params.id, function(err, item){
        if (err) return res.redirect('/items');
        res.render('items/show', { item });
    });
}

function update(req, res) {
    Item.findByIdAndUpdate(req.params.id, req.body, function(err, item){
        res.redirect(`/items/${req.params.id}`); 
    });
}

module.exports = {
    index,
	show,
	create,
	delete: deleteItem,
	//edit,
	update
};