const expressRoutes = require('express');
const getAllPosts = require('../controllers/posts').allPosts;
const submission = require('../controllers/posts').postSubmission;
const update = require('../controllers/posts').updateData;
const responsiveUpdate = require('../controllers/posts').updateResponsiveData;
const removing = require('../controllers/posts').deletion;
const post = require('../controllers/posts').existingPost;
const likes = require('../controllers/posts').likePosts;
const images = require('../uploads/upload');
const check = require('../authentication/authorize').authorize;

const route = expressRoutes.Router();
const getPosts = route.get('/all', check, getAllPosts);
const getPost = route.get('/post/:id', check, post);
const postPost = route.post('/new-posts', check, images, submission);
const updatePost = route.put('/update', check, images, update);
const updateResponsivePost = route.put('/update/:id', check, images, responsiveUpdate);
const deletePost = route.delete('/delete', check, removing);
const likePost = route.post('/likes', check, likes)

module.exports = { getPosts, postPost, updatePost, updateResponsivePost, deletePost, getPost, likePost };