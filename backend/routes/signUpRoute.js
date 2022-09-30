const expressRoutes = require('express');
const registration = require('../controllers/userCreation').auth;
const route = expressRoutes.Router();
module.exports = route.post('/signUp', registration);