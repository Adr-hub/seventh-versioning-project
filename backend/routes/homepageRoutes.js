const expressRoutes = require('express');
const getHomepage = require('../controllers/homepage').homepagePosts;
const submission = require('../controllers/homepage').postSubmission;
const update = require('../controllers/homepage').updateData;
const responsiveUpdate = require('../controllers/homepage').updateResponsiveData;
const removing = require('../controllers/homepage').deletion;
const post = require('../controllers/homepage').existingPost;
const likes = require('../controllers/homepage').likePosts;
const images = require('../uploads/upload');
const check = require('../authentication/authorize').authorize;

const route = expressRoutes.Router();
const getPosts = route.get('/all', check, getHomepage);
const getPost = route.get('/post/:id', check, post);
const postPost = route.post('/posts', check, images, submission);
const updatePosts = route.put('/update', check, images, update);
const updateResponsivePosts = route.put('/update/:id', check, images, responsiveUpdate);
const deletePosts = route.delete('/delete', check, removing);
const likePosts = route.post('/likes', check, likes)

module.exports = { getPosts, postPost, updatePosts, updateResponsivePosts, deletePosts, getPost, likePosts };