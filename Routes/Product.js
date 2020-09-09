const express = require("express");
const router = express.Router();
const mongoObjectId = require('mongoose').Types.ObjectId;
const Product = require("../Models/ProductModel");
const validationProductInput = require("../validation/Product");
const returnMessage = require('../validation/MessageHandelling').returnMessage;


router.post("/Product", (req, res) => {

    try {

        const { error, isValid } = validationProductInput(req.body);

        if (isValid === false) return returnMessage.globalOne(isValid, 400, error, res, "");


        const newProduct = new Product({
            name: req.body.name,
            categoryId: req.body.categoryId,
            description: req.body.description,
            imageUrl1: req.body.imageUrl1,
            imageUrl2: req.body.imageUrl2,
            imageUrl3: req.body.imageUrl3,
            imageUrl4: req.body.imageUrl4,
            availableQuantity: req.body.availableQuantity,
            unitPrice: req.body.unitPrice,
            originPrice: req.body.originPrice,
            discountPercent: req.body.discountPercent,
            taxPercent: req.body.taxPercent,
            currency: req.body.currency,
            createdAt: Date.now()
        });

        newProduct.save((err, data) => {
            if (err) return returnMessage.globalOne(false, 400, "Product adding error.Please try agin", res, err);
            else return returnMessage.globalOne(true, 200, "Product created successfully", res, "");

        })

    } catch (ex) {
        return returnMessage.globalOne(false, 501, "server side error occurred! Please try again shortly..", res, ex);
    }

});



router.get("/Product", (req, res) => {
    Product.find()
        .sort({ date: -1 })
        .then((product) => res.status(200).send(product))
        .catch((err) => {
            return returnMessage.globalOne(false, 404, "There No any product found", res, err);
        });
});



router.get('/Product/:id', (req, res) => {
    Product.findById(req.params.id).then((product) => res.send(product)).catch((err) => {
        return returnMessage.globalOne(false, 501, "Product gettiing error.Please try agian.", res, err);
    });
});




router.put('/Product/:id', (req, res) => {


    try {

        if (!mongoObjectId.isValid(req.params.id)) return returnMessage.globalOne(false, 404, "There No record with this id", res, "");

        const { error, isValid } = validationProductInput(req.body);
        if (isValid === false) return returnMessage.globalOne(isValid, 400, error, res, "");


        const ProductUpdate = {
            categoryId: req.body.categoryId,
            description: req.body.description,
            imageUrl1: req.body.imageUrl1,
            imageUrl2: req.body.imageUrl2,
            imageUrl3: req.body.imageUrl3,
            imageUrl4: req.body.imageUrl4,
            availableQuantity: req.body.availableQuantity,
            unitPrice: req.body.unitPrice,
            originPrice: req.body.originPrice,
            discountPercent: req.body.discountPercent,
            taxPercent: req.body.taxPercent,
            currency: req.body.currency,
            modifiedAt: Date.now()
        };


        Product.findByIdAndUpdate(req.params.id, { $set: ProductUpdate }, { new: true, useFindAndModify: false }, (err, data) => {

            if (err) return returnMessage.globalOne(false, 400, "Product updating error.Please try again", res, err);
            else return returnMessage.globalOne(true, 200, "Product " + data.name + " updated successfully", res, "");

        })


    } catch (ex) {
        return returnMessage.globalOne(false, 501, "server side error occurred! Please try again shortly..", res, ex);
    }




})


module.exports = router