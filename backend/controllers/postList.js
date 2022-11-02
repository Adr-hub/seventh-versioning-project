const userList = require('../models/postSchema');

exports.posts = (req, res, next) => {
    if (req.get('Authorization') !== undefined && req.get('Authorization') !== 'Bearer null')
        userList.find({ employeeId: req.authorize.employeeId }).sort({ date: 'desc' }).then((data) => {

            res.json(data).status(200);
        })
            .catch((error) => {
                res.status(500).json(error);
            });
    else {
        let error = new Error('Unauthorize authentication !');
        res.status(403).json({ message: error.message });
    }
};