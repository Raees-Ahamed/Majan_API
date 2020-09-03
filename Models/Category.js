const mongoose = require('mongoose');

//category schema
const categorySchema = new mongoose.Schema({

    categoryName: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true }

});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;