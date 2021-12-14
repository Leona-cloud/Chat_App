const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true
    },
    password: { 
        type: String,
        required: true,
        minlength: 8
    }
});





exports.User = mongoose.model('User', userSchema)