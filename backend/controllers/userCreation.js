const user = require('../models/user.js');
const validator = require('express-validator');
const hashPackage = require('bcrypt');
const randomKey = require('crypto');
const tokens = require('jsonwebtoken');
exports.auth = (req, res) => {
    if (!req.body.email.match(/[<>/;'{}]+/) && !req.body.password.match(/[<>/;{}]+/) && validator.body(req.body.email).isEmail()) {
        hashPackage.hash(req.body.password, 12).then((hash) => {
            new user({ email: req.body.email, password: hash }).save()

                .then(() => {
                    user.findOne({ email: req.body.email }).then((registered) => {

                        if (!registered) {
                            res.status(401).json({ message: 'Email error !' });
                        }
                        else {
                            hashPackage.compare(req.body.password, registered.password).then((compared) => {
                                if (compared) {

                                    const secret = randomKey.randomBytes(32);
                                    exports.secret = secret;

                                    let token = tokens.sign({ userId: String(registered._id) }, secret, { expiresIn: '3h' });
                                    res.status(201).json({ employeeId: registered._id, employeeId: String(registered._id), token: token, message: 'Registration completed' });
                                }

                                else {

                                    res.status(401).json({ message: 'Password error !' });
                                }
                            })
                                .catch((error) => {
                                    res.status(404).json({ message: error });
                                });
                        }
                    })

                })
                .catch((error) => {
                    res.status(400).json(error);
                });

        }).catch((error) => {
            console.error(error, 'Hash error !');
            res.status(500).json(error);
        });
    }

    else {
        let error = new Error('Registration error !');
        res.status(500).json({ message: error.message });
    }
}