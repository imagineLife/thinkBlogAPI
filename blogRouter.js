const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();

const jsonParser = bodyParser.json();

const {BlogPost} = require('./models');

//GET
router.get('/', (req, res) => {
  BlogPost
    .find()
    .exec()
    .then(posts => {
      res.json(posts.map(post => post.apiRepr()));
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went terribly wrong'});
    });
});

//GET
router.get('/:id', (req, res) => {
  BlogPost
    .findById(req.params.id)
    .exec()
    .then(blogPostResult =>
        res.json(blogPostResult.apiRepr()))
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went terribly wrong'});
    });
});

// //ADD
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
    // console.log(requiredFields[i]);
  }

  BlogPost
  .create({
    title : req.body.title, 
    content: req.body.content, 
    author: req.body.author
  })
  .then(blogPost => res.status(201).json(blogPost.apiRepr()))
  .catch(err => {
      console.error(err);
      res.status(500).json({error: 'Something went wrong'});
  });
});


//UPDATE
router.put('/:id', (req, res) => {
  //NOTE: this doesn't check the DB if the requested ID matches and ID in the DB

  //validate that the id in the url matches the id in the body of the request object
  if (req.params.id !== req.body.id) {
    res.status(400).json({
      error: "the two requesting ids don't match"
    });
  }
 
  const updatingObj = {};

  const updatableFields = ['title', 'content', 'author'];

  updatableFields.forEach(field => {
    if (field in req.body){
      updatingObj[field] = req.body[field];
    }
  });

  // console.log(updatingObj);

  BlogPost
    .findByIdAndUpdate(req.params.id, {$set: updatingObj}, {new: true})
    .exec()
    .then(postThatGotUpdated => res.status(201).json(postThatGotUpdated.apiRepr()))
    .catch(err => res.status(500).json({message: "something in the PUT messed up"}));

});


//DELETE
router.delete('/:id', (req,res) =>{
  BlogPost
    .findByIdAndRemove(req.params.id)
    .exec()
    .then(() => {
      res.status(204).end();
    })
    .catch(err => res.status(500).json({message: "something in the PUT messed up"}));
;
});

module.exports = router;