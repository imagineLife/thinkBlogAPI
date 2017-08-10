const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const blogRouter = require('./blogRouter');

const {PORT, DATABASE_URL} = require('./config');
const {BlogPosts} = require('./models');

//is this order mandatory?
const app = express();

mongoose.Promise = global.Promise;

console.log(db.blogData.findOne());