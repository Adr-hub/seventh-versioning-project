const expressRoutes = require('express');
const postsHomepage = require('../controllers/homepage').homepage;
const route = expressRoutes.Router();
module.exports = route.get('/homepage', postsHomepage);