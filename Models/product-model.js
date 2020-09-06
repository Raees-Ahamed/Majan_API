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
  imageUrl: {
    type: String,
    required: true,
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

module.exports = Product = mongoose.model("products", ProductSchema);
