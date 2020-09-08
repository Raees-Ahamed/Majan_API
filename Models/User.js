const mongoose = require('mongoose');

//user schema
const userSchema = new mongoose.Schema({

    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    password: { type: String, required: true },
    usertype: { type: Number, required: true }

});

const User = mongoose.model("User", userSchema);

module.exports = User;