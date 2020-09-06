var express = require('express');
var router = express.Router();
const Category = require('../Models/Category');
const validationOrderInput = require("../validation/Order");



router.post('/Order', async (req, res) => {

    try {

        const { error, isValid } = validationOrderInput(req.body);

        if (isValid === false) {
            return res.status(400).send({
                isValid: isValid,
                description: error
            })
        }


        console.log("hello")






    } catch (ex) {
        return res.status(501).send({
            isValid: false,
            description: "server side error occurred! Please try again shortly.." 
        });
    }


})






module.exports = router;