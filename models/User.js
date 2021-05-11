const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxLength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: ture
    },
    password: {
        type: String,
        maxLength: 5
    },
    lastname: {
        type: String,
        maxLenght: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    tocken: String,
    tockenExp: Number
});

const User = mongoose.Model('User', userSchema);

module.exports = {User};