const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./models');

// adding some blogpost content
// to retrieve.
BlogPosts.create('Title1', 'content1', 'author1');
BlogPosts.create('Title2', 'content2', 'author2');
BlogPosts.create('Title3', 'content3', 'author3');
BlogPosts.create('Title4', 'content4', 'author4');
BlogPosts.create('Title5', 'content5', 'author5');

// when the root of this router is called with GET, return
// all current BlogPosts items

router.get('/', (req, res) => {
  res.json(BlogPosts.get());
});

router.post('/', jsonParser, (req, res) => {
  // ensure `id`, `title`, `content` & `author` are in the post
  const requiredFields = [`title`, `content`, `author`];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }

  const item = BlogPosts.create(req.body.title, req.body.content, req.body.author);
  res.status(201).json(item);
});

router.put('/:id', jsonParser, (req, res) => {
  const requiredFields = [`title`, `content`, `author`];
  //loop through inputs, if one is missing alert user it is missing

  for (i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const displayMessage = `Missed the \`${field}\` field!`;
      console.log(displayMessage);
      return res.status(400).send(displayMessage);
    }
  }

  //if the id in the parameters is NOT the same as the 
  //ID in the body, alert user
  if (req.params.id !== req.body.id) {
    const errorMessage = `the id's not match, ya fool. cant mess with id ${req.params.id} and ${req.body.id}.`;
    console.error(errorMessage);
    return res.status(400).send(errorMessage);
  }

  //update the recipe with given ID
  console.log(`Updating blog-post \`${req.params.id}\``);
  BlogPosts.update({
    id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
//NEEDED?!
    publishDate: req.body.publishDate
  });
  res.status(204).end();
});

// when DELETE request comes in with an id in path,
// try to delete that item from BlogPosts.
router.delete('/:id', (req, res) => {
  BlogPosts.delete(req.params.id);
  console.log(`Deleted blog post \`${req.params.id}\``);
  res.status(204).end();
});

module.exports = router;