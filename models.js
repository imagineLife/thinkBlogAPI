const mongoose = require('mongoose');

const blogPostSchema = mongoose.Schema({
  author : {
    firstName : String,
    lastName : String
  },
  title: {type: String},
  content: {type: String},
  created: {type: String} 
});

blogPostSchema.virtual('authorName').get(function() {
  return `${this.author.firstName} ${this.author.lastName}`.trim();
});

blogPostSchema.methods.apiRepr = function() {
  return {
    // id: this._id,
    title: this.title,
    content: this.content,
    author: this.authorName,
    created: this.created
  };
};

const BlogPost = mongoose.model('collblog', blogPostSchema);
module.exports = {BlogPost};
//exporting a wrapper object that has ablogPost property, set to blogpost