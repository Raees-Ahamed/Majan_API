const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require('mongoose');

const Product = require("../../models/product-model");

const validationProductInput = require("../../validation/product-validation");

// @route POST api/product/
// @desc create product details
// @access public

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validationProductInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newProduct = new Product({
      name: req.body.name,
      categoryId: req.body.categoryId,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      availableQuantity: req.body.availableQuantity,
      unitPrice: req.body.unitPrice,
      originPrice: req.body.originPrice,
      discountPercent: req.body.discountPercent,
      currency: req.body.currency,
      createdOn: Date.now()
    });

    newProduct
      .save()
      .then((product) => res.json(product))
      .catch((err) => res.json(err));
  }
);

// @route GET api/product/
// @desc get product details
// @access public

router.get("/", (req, res) => {
  Product.find()
    .sort({ date: -1 })
    .then((product) => res.json(product))
    .catch((err) => res.status(500).send({ msg: "No Product Found", error: err }));
});

// @route GET api/product:id
// @desc get product details by id
// @access public

router.get('/:id', passport.authenticate('jwt', { session: false}), (req, res) => {
    Product.findById(req.params.id).then((product) => res.json(product)).catch((err) => res.status(500).send(err));
});

module.exports = router