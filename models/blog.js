const mongoose = require('mongoose');
const marked = require('marked'); // for markdown
const domPurify = require('dompurify'); // for sanitizing html
const { JSDOM } = require('jsdom'); // Web standards, used with dompurify
const jsDomPurify = domPurify(new JSDOM().window);
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    content: {
        type: String,
        maxLength: 200,
    },
    author: {
        type: String,
        },
    createdAt: {
        type: Date,
        default: Date.now,
        },
    article: {
        type: Schema.Types.ObjectId,
        ref: 'Blog',
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxLength: 25,
    },
    image: {
        type: String,
        required: true,
    },
    markdown: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    author: {
        type: String,
    },
    authorEmail: {
        type: String,
    },
    comments: [commentSchema],
    sanitizedHtml: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

blogSchema.pre('validate', function (next) {
    if (this.markdown) {
      this.sanitizedHtml = jsDomPurify.sanitize(marked.parse(this.markdown));
    }
    next();
});

module.exports = mongoose.model('Blog', blogSchema); // Compile the schema into a model and export it.