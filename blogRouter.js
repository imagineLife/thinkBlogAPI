const bodyParser = require('body-parser');
const express = require('express');
// const mongoose = require('mongoose');
const router = express.Router();

const jsonParser = bodyParser.json();

const {BlogPost} = require('./models');
// mongoose.Promise = global.Promise;

//GET
router.get('/posts', jsonParser, (req, res) => {
  BlogPost
    .find()
    .exec()
    .then((posts) => {
      console.log('' +
        '***\n' +
        'blogdata from db should be ', posts, '\n'+
        '***');
      res.json({
        blogposts: posts.map(
          posts => posts.apiRepr())
      });
    });

  // res.json(BlogPost.findOne());

  // .catch(
  //     err => {
  //       console.error(err);
  //       res.status(500).json({message: 'Internal server error'});
  //   });
});


// //ADD
// router.post('/', jsonParser, (req, res) => {
//   // ensure `id`, `title`, `content` & `author` are in the post
//   const requiredFields = [`title`, `content`, `author`];
//   for (let i=0; i<requiredFields.length; i++) {
//     const field = requiredFields[i];
//     if (!(field in req.body)) {
//       const message = `Missing \`${field}\` in request body`
//       console.error(message);
//       return res.status(400).send(message);
//     }
//   }

//   const item = BlogPosts.create(req.body.title, req.body.content, req.body.author);
//   res.status(201).json(item);
// });


// //UPDATE
// router.put('/:id', jsonParser, (req, res) => {
//   const requiredFields = [`title`, `content`, `author`];
//   //loop through inputs, if one is missing alert user it is missing

//   for (i=0; i<requiredFields.length; i++) {
//     const field = requiredFields[i];
//     if (!(field in req.body)) {
//       const displayMessage = `Missed the \`${field}\` field!`;
//       console.log(displayMessage);
//       return res.status(400).send(displayMessage);
//     }
//   }

//   //if the id in the parameters is NOT the same as the 
//   //ID in the body, alert user
//   if (req.params.id !== req.body.id) {
//     const errorMessage = `the id's not match, ya fool. cant mess with id ${req.params.id} and ${req.body.id}.`;
//     console.error(errorMessage);
//     return res.status(400).send(errorMessage);
//   }

//   //update the recipe with given ID
//   console.log(`Updating blog-post \`${req.params.id}\``);
//   BlogPosts.update({
//     id: req.body.id,
//     title: req.body.title,
//     content: req.body.content,
//     author: req.body.author,
// //NEEDED?!
//     publishDate: req.body.publishDate
//   });
//   res.status(204).end();
// });


// //DELETE
// router.delete('/:id', (req, res) => {
//   BlogPosts.delete(req.params.id);
//   console.log(`Deleted blog post \`${req.params.id}\``);
//   res.status(204).end();
// });

module.exports = router;