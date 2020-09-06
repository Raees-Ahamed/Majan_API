const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require('mongoose');
const mongoObjectId = require('mongoose').Types.ObjectId;
const Product = require("../Models/ProductModel");
const validationProductInput = require("../validation/Product");


router.post("/Product", (req, res) => {

    try {

        const { error, isValid } = validationProductInput(req.body);

        if (isValid === false) {
            return res.status(400).send({
                isValid: isValid,
                description: error
            })
        }

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
            if (err) {
                return res.status(400).send({
                    isValid: false,
                    description: "Product adding error.Please try agin",
                });
            }
            else {
                return res.status(400).send({
                    isValid: true,
                    description: "Product created successfully",
                });
            }
        })

    } catch (ex) {
        return res.status(500).send({
            isValid: true,
            description: "server side error occurred! Please try again shortly.."
        });
    }

});



router.get("/Product", (req, res) => {
    Product.find()
        .sort({ date: -1 })
        .then((product) => res.send(product))
        .catch((err) => res.status(500).send({
            isValid: false,
            description: "No product found",
        }));
});



router.get('/Product/:id', (req, res) => {
    Product.findById(req.params.id).then((product) => res.send(product)).catch((err) => res.status(500).send({
        isValid: false,
        description: "Profuct getting error.Please try again",
    }));
});




router.put('/Product/:id', (req, res) => {


    try {

        if (!mongoObjectId.isValid(req.params.id)) {
            return res.status(404).send({
                isValid: false,
                description: "There No record with this id"
            });
        }

        const { error, isValid } = validationProductInput(req.body);

        if (isValid === false) {
            return res.status(400).send({
                isValid: isValid,
                description: error
            })
        }


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
            currency: req.body.currency
        };


        Product.findByIdAndUpdate(req.params.id, { $set: ProductUpdate }, { new: true, useFindAndModify: false }, (err, data) => {

            if (err) {
                return res.status(400).send({
                    isValid: false,
                    description: "Product updating error."
                })
            } else {
                return res.status(400).send({
                    isValid: true,
                    description: "Product " + data.name + " updated successfully"
                })
            }

        })


    } catch (ex) {
        return res.status(500).send({
            isValid: true,
            description: "server side error occurred! Please try again shortly.."
        });
    }




})


module.exports = router