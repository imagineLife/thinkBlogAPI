
const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const {BlogPosts} = require('./models');

const jsonParser = bodyParser.json();
const app = express();

// log the http layer
app.use(morgan('common'));


// adding some blogpost content
// to retrieve.
BlogPosts.create('Title1', 'content1', 'author1');
BlogPosts.create('Title2', 'content2', 'author2');
BlogPosts.create('Title3', 'content3', 'author3');
BlogPosts.create('Title4', 'content4', 'author4');
BlogPosts.create('Title5', 'content5', 'author5');

// when the root of this router is called with GET, return
// all current BlogPosts items
app.get('/blog-posts', (req, res) => {
  res.json(BlogPosts.get());
});

app.post('/blog-posts', jsonParser, (req, res) => {
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

// when PUT request comes in with updated item, ensure has
// required fields. also ensure that item id in url path, and
// item id in updated item object match. if problems with any
// of that, log error and send back status code 400. otherwise
// call `BlogPosts.update` with updated item.

app.put('/blog-posts/:id', jsonParser, (req, res) => {
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
    author: req.body.author
  });
  res.status(204).end();
});

// when DELETE request comes in with an id in path,
// try to delete that item from BlogPosts.
app.delete('/blog-posts/:id', (req, res) => {
  BlogPosts.delete(req.params.id);
  console.log(`Deleted blog post \`${req.params.id}\``);
  res.status(204).end();
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});
