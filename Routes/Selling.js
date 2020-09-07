var express = require('express');
var router = express.Router();
const Product = require("../Models/ProductModel");

const returnMessage = require('../validation/MessageHandelling').returnMessage;


router.get('/Selling/:catId', async (req, res) => {
    try {
        Product.find({ categoryId: req.params.catId })
            .limit(8)
            .sort({ modifiedAt: -1 })
            .then((data, err) => {
                if (!err) res.status(200).send(data)
                else return returnMessage.globalOne(false, 500, "No product found", res);
            })

    } catch (ex) {
        return returnMessage.globalOne(false, 501, "server side error occurred! Please try again shortly..", res);
    }
})



module.exports = router;