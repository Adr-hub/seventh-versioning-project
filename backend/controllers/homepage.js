const postUser = require('../models/postUser');
const imageFolder = require('fs');
const user = require('../models/user');

exports.homepagePosts = (req, res) => {
    if (req.get('Authorization') !== undefined && req.get('Authorization') !== 'Bearer null')
        postUser.find().sort({ date: 'desc' }).then((data) => {
            res.status(200).json(data);
        })
            .catch((error) => {
                res.status(500).json(error);
            });
    else {
        let error = new Error('Unauthorize authentication !');
        res.status(403).json({ message: error.message });
    }

};



exports.postSubmission = (req, res) => {
    if (req.body.employeeId.toString() === req.authorize.employeeId && req.get('Authorization') !== undefined && req.get('Authorization') !== 'Bearer null') {
        if (req.file !== undefined) {
            let data = { title: req.body.title, message: req.body.message, image: req.protocol + '://' + req.get('host') + '/' + req.file.filename, employeeId: req.body.employeeId.toString(), date: Date.now() };

            new postUser(data).save()

                .then(() => {
                    res.status(201).json({ message: 'Post submitted !' });
                })
                .catch((error) => {
                    res.status(500).json(error);
                });
        }
        else if (req.file === undefined) {
            let data = { title: req.body.title, message: req.body.message, employeeId: req.body.employeeId.toString(), date: Date.now() };
            new postUser(data).save()

                .then(() => {
                    res.status(201).json({ message: 'Post submitted !' });
                })
                .catch((error) => {
                    res.status(500).json(error);
                });
        }
    }
    else {
        let error = new Error('Submission error !');
        res.status(500).json({ message: error.message });
    }
};

exports.updateData = (req, res, next) => {

    if (req.file !== undefined) {
        if ((req.body.employeeId.toString() === req.authorize.employeeId && req.get('Authorization') !== undefined && req.get('Authorization') !== 'Bearer null') || req.body.defaultRole === '1') {
            let newData = { title: req.body.title, message: req.body.message, image: req.protocol + '://' + req.get('host') + '/' + req.file.filename, employeeId: req.body.employeeId.toString() };

            postUser.findById(req.body.postId)

                .then((posts) => {
                    if ((req.body.employeeId.toString() === posts.employeeId) || req.body.defaultRole === '1') {

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
                            employeeId: newData.employeeId,
                            likes: posts.likes,
                            date: Date.now()
                        })

                            .then(() => {
                                res.status(201).json({ message: 'Successful update !' });
                            })
                            .catch((error) => {
                                res.status(500).json(error);
                            });

                    }
                    else {
                        let error = new Error('Unauthorize modification !');
                        res.status(403).json({ message: error.message });
                    }
                })

                .catch((error) => {
                    res.status(500).json(error);
                });
        }
        else {
            let error = new Error('Update error !');
            res.status(500).json({ message: error.message });
        }

    }

    else if (req.file === undefined) {
        if ((req.body.employeeId.toString() === req.authorize.employeeId && req.get('Authorization') !== undefined && req.get('Authorization') !== 'Bearer null') || req.body.defaultRole === '1') {
            let newData = { title: req.body.title, message: req.body.message, employeeId: req.body.employeeId.toString() };

            postUser.findById(req.body.postId)
                .then((posts) => {
                    if ((req.body.employeeId.toString() === posts.employeeId) || req.body.defaultRole === '1') {
                        postUser.findByIdAndUpdate(req.body.postId, {
                            title: newData.title,
                            message: newData.message,
                            employeeId: newData.employeeId,
                            image: undefined,
                            likes: posts.likes,
                            date: Date.now()

                        })

                            .then(() => {
                                res.status(201).json({ message: 'Successful update !' });
                            })
                            .catch((error) => {
                                res.status(500).json(error);
                            });
                    }

                    else {
                        let error = new Error('Unauthorize modification !');
                        res.status(403).json({ message: error.message });
                    }

                })

                .catch((error) => {
                    res.status(500).json(error);
                });
        }
        else {
            let error = new Error('Update error !');
            res.status(500).json({ message: error.message });
        }
    }
}

exports.updateResponsiveData = (req, res, next) => {

    if (req.file !== undefined) {
        if ((req.body.employeeId.toString() === req.authorize.employeeId && req.get('Authorization') !== undefined && req.get('Authorization') !== 'Bearer null') || req.body.defaultRole === '1') {
            let newData = { title: req.body.title, message: req.body.message, image: req.protocol + '://' + req.get('host') + '/' + req.file.filename, employeeId: req.body.employeeId.toString() };
            postUser.findById(req.params.id)

                .then((posts) => {

                    if ((req.body.employeeId.toString() === posts.employeeId) || req.body.defaultRole === '1') {
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
                            employeeId: newData.employeeId,
                            likes: posts.likes,
                            date: Date.now()
                        })

                            .then(() => {
                                res.status(201).json({ message: 'Successful update !' });
                            })
                            .catch((error) => {
                                res.status(500).json(error);
                            });

                    }

                    else {
                        let error = new Error('Unauthorize modification !');
                        res.status(403).json({ message: error.message });
                    }

                })

                .catch((error) => {
                    res.status(500).json(error);
                });

        }
        else {
            let error = new Error('Update error !');
            res.status(500).json({ message: error.message });
        }

    }

    else if (req.file === undefined) {
        if ((req.body.employeeId.toString() === req.authorize.employeeId && req.get('Authorization') !== undefined && req.get('Authorization') !== 'Bearer null') || req.body.defaultRole === '1') {
            let newData = { title: req.body.title, message: req.body.message, employeeId: req.body.employeeId.toString() };

            postUser.findById(req.params.id)

                .then((posts) => {
                    if ((req.body.employeeId.toString() === posts.employeeId) || req.body.defaultRole === '1') {
                        postUser.findByIdAndUpdate(req.params.id, {
                            title: newData.title,
                            message: newData.message,
                            employeeId: newData.employeeId,
                            likes: posts.likes,
                            date: Date.now()
                        })

                            .then(() => {
                                res.status(201).json({ message: 'Successful update !' });
                            })
                            .catch((error) => {
                                res.status(500).json(error);
                            });

                    }
                    else {
                        let error = new Error('Unauthorize modification !');
                        res.status(403).json({ message: error.message });
                    }

                })

                .catch((error) => {
                    res.status(500).json(error);
                });

        }

        else {
            let error = new Error('Update error !');
            res.status(500).json({ message: error.message });
        }
    }

}

exports.deletion = (req, res, next) => {

    postUser.findById(req.body.id)
        .then((data) => {
            if ((req.body.id === data._id.toString() && req.body.employeeId.toString() === req.authorize.employeeId && req.body.employeeId.toString() === data.employeeId) || req.body.defaultRole === '1') {

                imageFolder.readdir('images', (err, files) => {
                    if (err !== null) {
                        console.error(err, 'Directory error');
                        res.status(500).json(err);
                    }
                    else {
                        if (data.image !== undefined) {
                            imageFolder.unlink(process.cwd() + '/images/' + data.image.slice(22), (err) => {
                                if (err) {
                                    console.error(err, 'Removal error');
                                    res.status(500).json(err);
                                }

                                postUser.findByIdAndDelete(data._id)

                                    .then(() => {

                                        res.status(200).json({ message: 'Successful deletion !' });

                                    })
                                    .catch((error) => {
                                        res.status(500).json({ message: error });

                                    })
                            });

                        }

                        else if (data.image === undefined) {

                            postUser.findByIdAndDelete(data._id)

                                .then(() => {

                                    res.status(200).json({ message: 'Successful deletion !' });

                                })
                                .catch((error) => {
                                    res.status(500).json({ message: error });

                                })
                        }
                    }

                });
            }
            else {

                res.status(403).json({ message: 'Deletion not allowed !' })
            }
        })
        .catch((error) => {
            res.status(500).json(error);
        })


}
exports.existingPost = (req, res, next) => {

    postUser.findById(req.params.id)
        .then((data) => {

            if (req.params.id === data._id.toString() && req.get('Authorization') !== undefined && req.get('Authorization') !== 'Bearer null') {

                res.status(201).json(data);
            }
            else {
                res.status(500).json(error);
            }

        })
        .catch((error) => {
            res.status(500).json(error);
        });
};

exports.likePosts = (req, res, next) => {

    if (req.body.employeeId.toString() === req.authorize.employeeId && req.get('Authorization') !== undefined && req.get('Authorization') !== 'Bearer null') {

        postUser.findById(req.body.postId)
            .then((data) => {

                if (!data.likes.includes(req.authorize.employeeId)) {

                    postUser.updateOne({ _id: data._id }, { $push: { likes: req.authorize.employeeId } }).then(() => {

                        res.status(201).json({ likeCount: data.likes.length + 1, message: 'Successful post !' });
                    })
                        .catch((error) => {
                            res.status(500).json(error);
                        })
                }

                else {

                    let pushedEmployee = data.likes.find(element => element === req.authorize.employeeId);

                    if (pushedEmployee === req.authorize.employeeId) {

                        postUser.updateOne({ _id: data._id }, { $pull: { likes: pushedEmployee } })
                            .catch((error) => {
                                res.status(500).json(error);
                            })
                        res.status(200).json({ likeCount: data.likes.length - 1, message: 'Successful removal !' });
                    }
                }

            })
            .catch((error) => {
                res.status(500).json(error);
            });

    }
    else {

        res.status(403).json({ message: 'Action not allowed !' })
    }

}