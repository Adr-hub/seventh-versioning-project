const tokenCheck = require('jsonwebtoken');

exports.authorize = (req, res, next) => {

    try {
        let token = req.get('Authorization');

        if (token !== undefined) {
            let key = require('../controllers/login').secret;
            tokenCheck.verify(token.slice(7), key, (err, decoded) => {
                if (err) {
                    res.status(403).json({ message: err });
                }

                else {
                    req.authorize = {
                        employeeId: decoded.employeeId
                    }
                }
            });
        }
        next();
    }
    catch (e) {
        res.status(403).json({ message: e });
    }
};