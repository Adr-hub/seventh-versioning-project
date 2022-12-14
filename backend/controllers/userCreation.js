const user = require('../models/userSchema.js');
const validator = require('express-validator');
const hashPackage = require('bcrypt');
exports.auth = (req, res) => {
    if (!req.body.email.match(/[<>/;'{}]+/) && !req.body.password.match(/[<>/;{}]+/) && validator.body(req.body.email).isEmail()) {
        hashPackage.hash(req.body.password, 12).then((hash) => {
            new user({ email: req.body.email, password: hash, defaultRole: 0 }).save()

                .then(() => {
                    res.status(201).json({ message: 'Registration completed' });
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