const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({

  name: {
    type: String,
    required: true,
  },
  categoryId: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl1: {
    type: String,
    required: true,
  },
  imageUrl2: {
    type: String,
    required: false,
  },
  imageUrl3: {
    type: String,
    required: false,
  },
  imageUrl4: {
    type: String,
    required: false,
  },
  availableQuantity: {
    type: Number,
    required: true,
  },
  originPrice: {
    type: Number,
    required: true,
  },
  discountPercent: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  unitPrice: {
    type: Number,
    required: true,
  },
  createdOn: {
    type: Date,
  },
  modifiedAt: {
    type: Date,
    default: Date.now(),
  },
});


const Product = mongoose.model("Products", ProductSchema);

module.exports = Product;
