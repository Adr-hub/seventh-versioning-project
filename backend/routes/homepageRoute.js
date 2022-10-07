const expressRoutes = require('express');
const getHomepage = require('../controllers/homepage').homepagePosts;
const submission = require('../controllers/homepage').postSubmission;
const images = require('../uploads/upload');
const route = expressRoutes.Router();
const getPosts = route.get('/homepage/all', getHomepage);
const postPost = route.post('/homepage/post', images, submission);
module.exports = { getPosts, postPost };