const mongoosePackage = require('mongoose');
const emailValidator = require('mongoose-unique-validator');
const userSchema = new mongoosePackage.Schema({
    email: { type: String, unique: true },
    password: { type: String },
    defaultRole: { type: Number, value: 0, required: true }
});
userSchema.plugin(emailValidator);

module.exports = mongoosePackage.model('User', userSchema);