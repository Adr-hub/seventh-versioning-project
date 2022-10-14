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
    if (req.file !== undefined) {
        let data = { title: req.body.title, message: req.body.message, image: req.protocol + '://' + req.get('host') + '/' + req.file.filename, date: Date.now() };

        new postUser(data).save()

            .then(() => {
                res.status(201).json({ message: 'Post submitted !' });
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    }
    else if (req.file === undefined) {
        let data = { title: req.body.title, message: req.body.message, date: Date.now() };
        new postUser(data).save()

            .then(() => {
                res.status(201).json({ message: 'Post submitted !' });
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    }

};

exports.updateData = (req, res, next) => {
    if (req.file !== undefined) {
        let newData = { title: req.body.title, message: req.body.message, image: req.protocol + '://' + req.get('host') + '/' + req.file.filename };

        postUser.findById(req.body.postId)

            .then((posts) => {
                if (posts.image !== undefined) {
                    imageFolder.unlink(process.cwd() + '/images/' + posts.image.slice(22), (err) => {
                        if (err) {
                            console.error(err, 'Removal error');
                            res.status(500).json(err);
                        }
                    });
                }
                postUser.findByIdAndUpdate(req.body.postId, {
                    title: newData.title,
                    message: newData.message,
                    image: newData.image,
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

    else if (req.file === undefined) {
        let newData = { title: req.body.title, message: req.body.message };

        postUser.findById(req.body.postId)

            .then(() => {

                postUser.findByIdAndUpdate(req.body.postId, {
                    title: newData.title,
                    message: newData.message,
                    image: undefined,
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

}


exports.updateResponsiveData = (req, res, next) => {

    if (req.file !== undefined) {
        let newData = { title: req.body.title, message: req.body.message, image: req.protocol + '://' + req.get('host') + '/' + req.file.filename };
        postUser.findById(req.params.id)

            .then((posts) => {
                if (posts.image !== undefined) {
                    imageFolder.unlink(process.cwd() + '/images/' + posts.image.slice(22), (err) => {
                        if (err) {
                            console.error(err, 'Removal error');
                            res.status(500).json(err);
                        }
                    });
                }
                postUser.findByIdAndUpdate(req.params.id, {
                    title: newData.title,
                    message: newData.message,
                    image: newData.image,
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

    else if (req.file === undefined) {
        let newData = { title: req.body.title, message: req.body.message };

        postUser.findById(req.params.id)

            .then(() => {

                postUser.findByIdAndUpdate(req.params.id, {
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