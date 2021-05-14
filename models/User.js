const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlenght: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    tocken: String,
    tockenExp: Number
});

userSchema.pre('save', function (next) {
    const user = this;

    if (user.isModified('password')) {
        // 비밀번호를 암호화
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) {
                return next(err);
            }

            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) {
                    return next(err);
                }

                user.password = hash;
                next();
            });
        });
    }
});

const User = mongoose.model('User', userSchema);

module.exports = {User};