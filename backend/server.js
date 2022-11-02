const httpProtocol = require('http');
const dotenv = require('dotenv').config();

const express = require('express');
const expressFramework = express();
const mongooseModule = require('mongoose');
const registrationModule = require('./routes/signUpRoute');
const connectionModule = require('./routes/loginRoute');
const postModule = require('./routes/postRoutes');
const myPostListModule = require('./routes/postListRoute');
const static = express.static('images', { index: false });
const json = express.json();

mongooseModule.connect(/*Insert the connection URI here !*/)
    .then(function () {
        console.log('Connection succeeded !');
    })
    .catch(function (error) {
        console.error(error, 'Connection error !');
    });

expressFramework.use('/', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

expressFramework.use('/', json);
expressFramework.use(static);

expressFramework.use('/intranet/auth', registrationModule, connectionModule);

expressFramework.use('/posts', postModule.getPosts, postModule.postPost, postModule.updatePost, postModule.updateResponsivePost, postModule.deletePost, postModule.getPost, postModule.likePost);

expressFramework.use('/post-list', myPostListModule.list);

const expressServer = httpProtocol.createServer(expressFramework).listen(4200);
expressServer.on('error', (err) => {
    console.error(err, 'Server connection error !');
});