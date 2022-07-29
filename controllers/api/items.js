const Item = require('../../models/item');

function create(req, res){
    req.body.nowShowing = !!req.body.nowShowing; // convert nowShowing's checkbox of nothing or "on" to boolean
    req.body.features = req.body.features.replace(/\s*,\s*/g, ','); // remove whitespace next to commas
    if (req.body.features) {req.body.features = req.body.features.split(',')}; // split if it's not an empty string
    for (let key in req.body) { // remove empty properties
        if (req.body[key] === '') {delete req.body[key]};
    }
	Item.create(req.body)
	.then((item) => {
		res.status(201).json(item);
	}).catch((err) => {
		res.status(404).json({message: "create failed", err: err})
	})
}

function deleteItem (req, res){
	Item.findByIdAndRemove({_id: req.params.id})
	.then(() => {
		res.status(200).json({message: "The resource was successfully deleted"})  
	}).catch((err) => {
		res.status(404).json({message: "no resource", err: err})
	})
}

function index(req, res){
	Item.find({})
	.then(function(items){
		res.status(200).json(items); // send back status code & json
	}).catch((err) => {
		res.status(404).json(err)
	})
}

function show(req, res) {
    Item.findById(req.params.id).then(function(item) {
        res.status(200).json(item);
    }).catch((err) => {
        res.status(404).json({message: "show failed", err: err})
    })
}


function update(req, res){
    Item.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then((updateItem) => {
        res.status(200).json({message: "Resource updated", data: updateItem})
    }).catch((err) => {
        res.status(404).json({message: "update failed", err: err})
    })
}

module.exports = {
    index,
	show,
	create,
	delete: deleteItem,
	update
};