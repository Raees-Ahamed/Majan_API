const mongoose = require('mongoose');

//dashbord schema
const dashbordSchema = new mongoose.Schema({
    name: { type: String, required: true },
    imageUrl: { type: String, required: true }
});

const Dashbord = mongoose.model("Dashbord", dashbordSchema);

module.exports = Dashbord;