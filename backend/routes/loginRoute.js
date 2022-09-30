const expressRoutes = require('express');
const login = require('../controllers/login').login;
const route = expressRoutes.Router();
module.exports = route.post('/login', login);