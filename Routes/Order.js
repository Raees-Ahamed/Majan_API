var express = require('express');
var router = express.Router();
const Order = require('../Models/Order');
const validationOrderInput = require("../validation/Order");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "123456789";


router.post('/Order', async (req, res) => {

    try {

        let user = {};
        let orderItems = [];

        const token = req.header("x-jwt-token");

        if (!token) {
            return res.status(404).send({
                isValid: false,
                description: "Access denied.Invalid token"
            })
        }
        else if (!jwt.verify(token, SECRET_KEY)) {
            return res.status(404).send({
                isValid: false,
                description: "Access denied.Invalid token"
            })
        }

        user = jwt.decode(token, SECRET_KEY);

        const { error, isValid } = validationOrderInput(req.body);
        if (isValid === false) {
            return res.status(400).send({
                isValid: isValid,
                description: error
            })
        }


        req.body.forEach((orderItem) => {
            orderItems.push(createOrderItemObject(orderItem));
        });


        let order = new Order({
            userId: user.id,
            orders: orderItems
        });

        order.save((err, data) => {
            if (err) {
                return res.status(400).send({
                    isValid: false,
                    description: "Order placing error.Please try again"
                });

            } else {
                return res.status(200).send({
                    isValid: false,
                    description: "order placed sussfully"
                });

            }
        })

    } catch (ex) {
        return res.status(501).send({
            isValid: false,
            description: "server side error occurred! Please try again shortly.."
        });
    }


})






//-----------------------------------------------------------methods


createOrderItemObject = (orderItems) => {

    return {
        productId: orderItems.productId,
        categoryId: orderItems.categoryId,
        discountPercent: orderItems.discountPercent,
        taxPercent: orderItems.taxPercent,
        unitPrice: orderItems.unitPrice,
        quantity: orderItems.quantity,
        createdAt: Date.now()
    }

}


module.exports = router;