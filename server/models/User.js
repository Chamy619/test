const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
    token: String,
    tokenExp: Number
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
    } else {
        next();
    }
});

userSchema.methods.comparePassword = function (plainPassword, callback) {
    bcrypt.compare(plainPassword, this.password, (err, isMatch) => {
        if (err) {
            return callback(err);
        }
        
        callback(null, isMatch);
    });
}

userSchema.methods.generateToken = function(callback) {
    const user = this;

    // jsonwebtoken을 이용해 token 생성
    const token = jwt.sign(user._id.toHexString(), 'secretToken');
    user.token = token;
    user.save((err, user) => {
        if (err) {
            return callback(err);
        }
        callback(null, user);
    });
}

userSchema.statics.findByToken = function(token, callback) {
    const user = this;

    // 토큰 복호화
    jwt.verify(token, 'secretToken', (err, decoded) => {
        if (err) {
            callback(err);
        }

        user.findOne({'_id': decoded, 'token': token}, (err, user) => {
            if (err) {
                return callback(err);
            }

            callback(null, user);
        })
    })
}

const User = mongoose.model('User', userSchema);

module.exports = {User};