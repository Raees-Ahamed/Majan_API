const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({

    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    contactNo: {
        type: Number
    }
});

module.exports = User = mongoose.model('users', UserSchema);