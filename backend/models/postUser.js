const mongooseSchemas = require('mongoose');
const posts = new mongooseSchemas.Schema({
    title: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: Number, required: true }
});
module.exports = mongooseSchemas.model('Post', posts);