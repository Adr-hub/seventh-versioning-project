const postUser = require('../models/postUser');
exports.homepagePosts = (req, res) => {
    postUser.find().then((data) => {
        res.status(201).json(data);
    })
        .catch((error) => {
            res.status(500).json(error);
        });
};

exports.posts = (req, res) => {

    const data = { title: req.body.title, message: req.body.message, description: req.body.description, date: Date.now() };
    new postUser(data).save();

    res.status(200).json({ responseMessage: 'Post submited' })

};