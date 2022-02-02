/**
 * Module dependencies.
 */
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

// mongoose plugin dependencie
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
        required: [true, 'First name is required']
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, 'Last name is required']
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'Password is required'],
        minlength: [8, 'invalid password'],
        validate: {
            validator: function (v) {
                const reg = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
                return reg.test(v);
            },
            message: '{VALUE} is not a valid password!'
        },
        select: false,
    },
    username: {
        type: String,
        trim: true,
        minlength: [5, 'invalid phone'],
        required: [true, 'Username is required'],
        unique: true,
    },
    gender: {
        type: String,
        enum: {
            values: ['male', 'female', 'none'],
            message: '{VALUE} is not supported'
        },
        default: 'none',
        trim: true
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        trim: true,
        validate: {
            validator: function (v) {
                return validator.isMobilePhone(v);
            },
            message: '{VALUE} is not a valid phone number!'
        },
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    status: {
        type: String,
        enum: ['active', 'suspend', 'inactive'],
        default: 'active'
    },
    email: {
        type: String,
        trim: true,
        validate: {
            validator: function (v) {
                return validator.isEmail(v);
            },
            message: '{VALUE} is not a valid email!'
        },
        default: 'example@gmail.com'
    }
}, { timestamps: true });

//uniqu validator
UserSchema.plugin(uniqueValidator, { message: 'this is already taken.' });

//hashing password hook
UserSchema.pre('save', function async(next) {
    const user = this._doc;
    if (this.isNew || this.isModified('password')) {
        const salt = bcrypt.genSalt(10);
        salt.then(salt => { return bcrypt.hash(user.password, salt); })
            .then(hash => { user.password = hash; return next(); })
            .catch(err => next(err));
    }
});


// hash password for update User Password
UserSchema.pre('findByIdAndUpdate', function async(next) {
    const userPassword = this._update.password
    if (userPassword) {
        this._update.password = await bcrypt.hash(this._update.password, 10)
        const salt = bcrypt.genSalt(10);
        salt.then(salt => { return bcrypt.hash(userPassword, salt); })
            .then(hash => { userPassword = hash; return next(); })
            .catch(err => next(err));
    }
});

module.exports = mongoose.model('User', UserSchema);