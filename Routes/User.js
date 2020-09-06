var express = require('express');
var router = express.Router();
let password = require('../AppHelp/Password').password;
let userValidations = require('../validation/User').userValidations;
const User = require('../Models/User');
const mongoObjectId = require('mongoose').Types.ObjectId;
const jwt = require("jsonwebtoken");


const SECRET_KEY = "123456789";

router.get('/User/:email/:pwd', (req, res, next) => {

    try {

        const { error, isValid } = userValidations.validateSignIn(req.params.email, req.params.pwd);

        if (isValid === false) {

            return res.status(400).send({
                isValid: isValid,
                description: error
            })
        }

        User.findOne({
            email: req.params.email,
            password: password.encrypt(req.params.pwd)

        }).then(user => {

            if (user) {

                let token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY);

                return res.status(400).send({
                    isValid: true,
                    token: token
                });
            } else {
                return res.status(400).send({
                    isValid: false,
                    description: "User does not exist"
                });
            }
        });

    } catch (ex) {
        return res.status(501).send({
            isValid: false,
            description: "server side error occurred! Please try again shortly.."
        });
    }




});


router.post('/User', async (request, result) => {

    try {

        const { error, isValid } = userValidations.validateSignUp(request.body);
        if (isValid === false) {
           return result.status(400).send({
                isValid: isValid,
                description: error
            })
        }



        User.findOne({
            email: request.body.email
        }).then(user => {

            if (user) {

                return result.status(400).send({
                    isValid: false,
                    description: "User already present"
                });

            } else {

                let user = new User({

                    firstName: request.body.firstName,
                    lastName: request.body.lastName,
                    email: request.body.email,
                    password: password.encrypt(request.body.password),
                    usertype: request.body.usertype

                });


                user.save((err, data) => {
                    if (err) {

                        return result.status(400).send({
                            isValid: false,
                            description: "User registring error.Please try agin",
                        });

                    } else {
                        return result.status(400).send({
                            isValid: true,
                            description: "User registered Successfuly",
                        });
                    }
                })
            }

        })



    } catch (ex) {
        return result.status(501).send({
            isValid: false,
            description: "server side error occurred! Please try again shortly.."+ex,
        });
    }


})



module.exports = router;