
const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const {BlogPosts} = require('./models');

const jsonParser = bodyParser.json();
const app = express();

// log the http layer
app.use(morgan('common'));

// we're going to add some items to BlogPosts
// so there's some data to look at
BlogPosts.create('beans', 2);
BlogPosts.create('tomatoes', 3);
BlogPosts.create('peppers', 4);

// adding some blogpost content
// to retrieve.
BlogPosts.create('1', 'Title1', 'content1', 'author1');
BlogPosts.create('2', 'Title2', 'content2', 'author2');
BlogPosts.create('3', 'Title3', 'content3', 'author3');
BlogPosts.create('4', 'Title4', 'content4', 'author4');
BlogPosts.create('5', 'Title5', 'content5', 'author5');

// when the root of this router is called with GET, return
// all current BlogPosts items
app.get('/blog-posts', (req, res) => {
  res.json(BlogPosts.get());
});

app.post('/blog-posts', jsonParser, (req, res) => {
  // ensure `name` and `budget` are in request body
  const requiredFields = ['name', 'budget'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }

  const item = BlogPosts.create(req.body.name, req.body.budget);
  res.status(201).json(item);
});

// when PUT request comes in with updated item, ensure has
// required fields. also ensure that item id in url path, and
// item id in updated item object match. if problems with any
// of that, log error and send back status code 400. otherwise
// call `BlogPosts.update` with updated item.
app.put('/shopping-list/:id', jsonParser, (req, res) => {
  const requiredFields = ['name', 'budget', 'id'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }

  if (req.params.id !== req.body.id) {
    console.log('here');
    const message = `Request path id (${req.params.id}) and request body id (${req.body.id}) must match`;
    console.error(message);
    return res.status(400).send(message);
  }

  console.log(`Updating shopping list item \`${req.params.id}\``);
  BlogPosts.update({
    id: req.params.id,
    name: req.body.name,
    budget: req.body.budget
  });
  res.status(204).end();
});

app.put('/blog-posts/:id', jsonParser, (rep,res) => {
  const requiredFields = ['name', 'id', 'ingredients'];
  //loop through inputs, if one is missing alert user it is missing
  for (i=0; i,requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const displayMessage = `Dope! You're missing the \`${field}\` field!`;
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
  console.log(`Updating recipe \`${req.params.id}\``);
  Recipes.update({
    id: req.params.id,
    name: req.params.name,
    ingredients: req.params.ingredients
  });
  res.status(204).end();
});

// when DELETE request comes in with an id in path,
// try to delete that item from BlogPosts.
app.delete('/blog-posts/:id', (req, res) => {
  BlogPosts.delete(req.params.id);
  console.log(`Deleted blog post \`${req.params.ID}\``);
  res.status(204).end();
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});
