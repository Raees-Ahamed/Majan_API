var express = require('express');
var router = express.Router();
const Product = require("../Models/ProductModel");

const returnMessage = require('../validation/MessageHandelling').returnMessage;


router.get('/ProductCategory/:catId', async (req, res) => {
    try {
        await Product.find({ categoryId: req.params.catId }, (err, data) => {
            if (!err) return res.status(200).send(data);
            else return returnMessage.globalOne(false, 400, "No peoduct found", res, err);
        });
    } catch (ex) {
        return returnMessage.globalOne(false, 501, "server side error occurred! Please try again shortly..", res, ex);
    }
})



module.exports = router;