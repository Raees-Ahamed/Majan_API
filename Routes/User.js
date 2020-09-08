var express = require('express');
var router = express.Router();
let password = require('../AppHelp/Password').password;
let userValidations = require('../validation/User').userValidations;
const mongoObjectId = require('mongoose').Types.ObjectId;
const jwt = require("jsonwebtoken");

const returnMessage = require('../validation/MessageHandelling').returnMessage;
const User = require('../Models/User');


const SECRET_KEY = "123456789";

router.get('/User/:email/:pwd', (req, res, next) => {

    try {

        const validationCheck = userValidations.validateSignIn(req.params.email, req.params.pwd);

        if (validationCheck.isValid === false)
            return returnMessage.user(validationCheck.isValid, validationCheck.Email, validationCheck.Password, validationCheck.Description, "", 400, res);

        User.findOne({
            email: req.params.email,
            password: password.encrypt(req.params.pwd)

        }).then(user => {

            if (user) {
                let token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY);
                return returnMessage.user(true, true, true, "User present", token, 200, res);
            }
            else return returnMessage.user(false, false, false, "User does not exist", "", 404, res);
        });

    } catch (ex) {
        return returnMessage.user(false, false, false, "server side error occurred! Please try again shortly..", "", 501, res);
    }




});


router.post('/User', async (request, res) => {

    try {

        const validationCheck = userValidations.validateSignUp(request.body);
        if (validationCheck.isValid === false)
            return returnMessage.user(validationCheck.isValid, validationCheck.fName, validationCheck.lName, validationCheck.email, validationCheck.mobileNum, validationCheck.pwd, validationCheck.confirmPwd, validationCheck.Description, "", 400, res, "");


        User.findOne({
            email: request.body.email
        }).then(user => {

            if (user)
                return returnMessage.user(false, validationCheck.fName, validationCheck.lName, validationCheck.email, validationCheck.mobileNum, validationCheck.pwd, validationCheck.confirmPwd, "User already present", "", 400, res, "");

            else {

                let user = new User({

                    firstName: request.body.firstName,
                    lastName: request.body.lastName,
                    email: request.body.email,
                    mobileNumber: request.body.mobileNum,
                    password: password.encrypt(request.body.password),
                    usertype: request.body.usertype

                });


                user.save((err, data) => {
                    if (err)
                        return returnMessage.user(false, validationCheck.fName, validationCheck.lName, validationCheck.email, validationCheck.mobileNum, validationCheck.pwd, validationCheck.confirmPwd, "User registring error.Please try agin", "", 400, res, "");

                    let token = jwt.sign({ id: data._id, email: data.email }, SECRET_KEY);
                    return returnMessage.user(true, validationCheck.fName, validationCheck.lName, validationCheck.email, validationCheck.mobileNum, validationCheck.pwd, validationCheck.confirmPwd, "User registered Successfuly", token, 200, res, data.firstName);

                })
            }

        })



    } catch (ex) {
        return returnMessage.user(false, false, false, false, false, false, false, "server side error occurred! Please try again shortly..", "", 501, res, "");
    }


})



module.exports = router;