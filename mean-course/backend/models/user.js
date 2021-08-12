const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: { type: String, required: true },
    role: { type: String, default: "user", enum: ["user", "admin"] }
});
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema)
