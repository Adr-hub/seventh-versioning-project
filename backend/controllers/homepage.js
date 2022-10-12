const postUser = require('../models/postUser');
const imageFolder = require('fs');
exports.homepagePosts = (req, res) => {
    postUser.find().then((data) => {
        res.status(200).json(data);
    })
        .catch((error) => {
            res.status(500).json(error);
        });
};

exports.postSubmission = (req, res) => {

    const data = { title: req.body.title, message: req.body.message, date: Date.now() };
    new postUser(data).save();

    res.status(201).json({ responseMessage: 'Post submited' })

};

exports.updateData = (req, res, next) => {

    const newData = { title: req.body.title, message: req.body.message };

    postUser.findById(req.body.postId)

        .then(() => {

            postUser.findByIdAndUpdate(req.body.postId, {
                title: newData.title,
                message: newData.message,
                date: Date.now()
            })

                .then(() => {
                    res.status(201).json({ message: 'Successful update !' });
                })
                .catch((error) => {
                    res.status(500).json(error);
                });
        })

        .catch((error) => {
            res.status(500).json(error);
        });
}


exports.updateResponsiveData = (req, res, next) => {

    const newData = { title: req.body.title, message: req.body.message };
    postUser.findById(req.params.id)

        .then(() => {

            postUser.findByIdAndUpdate(req.params.id, {
                title: newData.title,
                message: newData.message,
                date: Date.now()
            })

                .then(() => {
                    res.status(201).json({ message: 'Successful responsive update !' });
                })
                .catch((error) => {
                    res.status(500).json(error);
                });
        })

        .catch((error) => {
            res.status(500).json(error);
        });
}

exports.deletion = (req, res, nexr) => {

    postUser.findByIdAndDelete(req.body.id)

        .then(() => {

            res.status(200).json({ message: 'Successful deletion !' });

        })
        .catch((error) => {
            res.status(500).json({ message: error });

        })

}