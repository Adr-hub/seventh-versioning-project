const mongooseSchemas = require('mongoose');
const posts = new mongooseSchemas.Schema({
    title: { type: String, required: true },
    message: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date }
});
module.exports = mongooseSchemas.model('Post', posts);