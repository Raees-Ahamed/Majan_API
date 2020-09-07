var express = require('express');
var router = express.Router();
const Dashbord = require('../Models/Dashbord');
const returnMessage = require('../validation/MessageHandelling').returnMessage;
const mongoObjectId = require('mongoose').Types.ObjectId;




router.post('/Dashbord', async (req, res) => {

    try {

        Dashbord.findOne({
            name: req.body.name
        }).then(dashbord => {

            if (dashbord)
                return returnMessage.globalOne(false, 400, "Image already present with this name", res);

            else {

                let dashbord = new Dashbord({
                    name: req.body.name,
                    imageUrl: req.body.imageUrl
                });


                dashbord.save((err, data) => {
                    if (err) return returnMessage.globalOne(false, 400, "Image saving error", res);
                    else
                        return returnMessage.globalOne(true, 200, "Image saved Successfuly", res);
                });
            }

        })



    } catch (ex) {
        return returnMessage.globalOne(false, 501, "server side error occurred! Please try again shortly..", res);
    }


})


router.get('/Dashbord', async (req, res) => {

    try {
        Dashbord.find((err, data) => {
            if (!err) return res.status(200).send(data);
            else return returnMessage.globalOne(false, 400, "No Images found", res);
        });
    } catch (ex) {
        return returnMessage.globalOne(false, 501, "server side error occurred! Please try again shortly..", res);
    }

})



router.put('/Dashbord/:id', (req, res) => {

    try {

        if (!mongoObjectId.isValid(req.params.id))
            return returnMessage.globalOne(false, 404, "There No record with this id", res);

        Dashbord.findByIdAndUpdate(req.params.id, { $set: {imageUrl : req.body.imageUrl} }, { new: true, useFindAndModify: false }, (err, data) => {

            if (err) return returnMessage.globalOne(false, 400, "Image updating error", res);
            else return returnMessage.globalOne(true, 200,  data.name + " image updated successfully", res);
        })


    } catch (ex) {
        return returnMessage.globalOne(false, 501, "server side error occurred! Please try again shortly..", res);
    }




})


module.exports = router;