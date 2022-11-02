const expressRoute = require('express');
const postImages = require('../uploads/upload');
const securityCheck = require('../authentication/authorize').authorize;
const posts = require('../controllers/postList').posts;
const route = expressRoute.Router();
const list = route.get('/:id', securityCheck, postImages, posts);
module.exports = { list };