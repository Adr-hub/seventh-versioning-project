const expressRoutes = require('express');
const getHomepage = require('../controllers/homepage').homepagePosts;
const postsHomepage = require('../controllers/homepage').posts;
const images = require('../uploads/upload');
const route = expressRoutes.Router();
const getPosts = route.get('/homepage/all', getHomepage);
const postPost = route.post('/homepage/post', images, postsHomepage);
module.exports = { getPosts, postPost };