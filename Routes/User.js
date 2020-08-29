var express = require('express');
var router = express.Router();
let password = require('../AppHelp/Password').password;

const User = require('../Models/User');
const mongoObjectId = require('mongoose').Types.ObjectId;
let respond;


router.get('/User/:email/:pwd', (req, res, next) => {

    try {

        User.findOne({
            email: req.params.email,
            password: password.encrypt(req.params.pwd)

        }).then(user => {

            if (user) {
                respond = {
                    respondId: 1,
                    description: "User present",
                    messageClass: "alert alert-success"
                }
            } else {
                respond = {
                    respondId: 0,
                    description: "User does not exist",
                    messageClass: "alert alert-danger"
                }
            }
            res.send(respond);
        });

    } catch (ex) {
        respond = {
            respondId: 0,
            description: "User checking error " + ex,
            messageClass: "alert alert-danger"
        }
        res.send(respond);
    }




});




router.post('/User', async (request, result) => {

    try {

        User.findOne({
            email: request.body.email
        }).then(user => {

            if (user) {

                respond = {
                    respondId: 0,
                    description: "User already present",
                    messageClass: "alert alert-danger"
                }
                result.send(respond);

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
                        respond = {
                            respondId: 0,
                            description: "User registring error.Please try agin",
                            messageClass: "alert alert-danger"
                        }
                    } else {
                        respond = {
                            respondId: 1,
                            description: "User registered Successfuly",
                            messageClass: "alert alert-sucess"
                        }
                    }
                    result.send(respond);
                })
            }

        })



    } catch (ex) {
        respond = {
            respondId: 0,
            description: "User registring error.Please try agin",
            messageClass: "alert alert-danger"
        }
        result.send(respond);
    }


})







module.exports = router;