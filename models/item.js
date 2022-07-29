const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    title: { 
        type: String,
        required: true
    },
    age: {
        type: Number, 
        default: 20, //defaults can also be a function, return
        min: 1 //can set min and max
    },
    features: [String],
    rating: {
        type: String,
        //enum: ['G', 'PG', 'PG-13', 'R', 'NC-17'], //can set a list of values
        //match: /^(G|PG|PG-13|R|NC-17)$/, //regex
        //maxlength: 5, //max length of string (also can set min)
    },
    approved: {
		type: String, 
        default: 'Yes'
	},
    active: {
        type: Boolean, 
        default: false
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Item', itemSchema); // Compile the schema into a model and export it.