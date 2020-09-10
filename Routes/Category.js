var express = require('express');
var router = express.Router();
const Category = require('../Models/Category');
const validationCategoryInput = require("../validation/Category");
const returnMessage = require('../validation/MessageHandelling').returnMessage;
const mongoObjectId = require('mongoose').Types.ObjectId;



router.post('/Category', async (req, res) => {

    try {

        const { error, isValid } = validationCategoryInput(req.body);

        if (isValid === false)
            return returnMessage.globalOne(isValid, 400, error, res, "");



        Category.findOne({
            categoryName: req.body.categoryName
        }).then(category => {

            if (category) return returnMessage.globalOne(false, 400, "Category already present with this name", res, "");

            else {

                let category = new Category({
                    categoryName: req.body.categoryName,
                    description: req.body.description,
                    imageUrl: req.body.imageUrl
                });


                category.save((err, data) => {
                    if (err) return returnMessage.globalOne(false, 400, "Category saving error", res, err);
                    else
                        return returnMessage.globalOne(true, 200, "Category saved Successfuly", res, "");
                });
            }

        })



    } catch (ex) {
        return returnMessage.globalOne(false, 501, "server side error occurred! Please try again shortly..", res, ex);
    }


})


router.get('/Category', async (req, res) => {

    try {
        Category.find((err, data) => {
            if (!err) return res.status(200).send(data);
            else return returnMessage.globalOne(false, 400, "No categories found", res, err);
        });
    } catch (ex) {
        return returnMessage.globalOne(false, 501, "server side error occurred! Please try again shortly..", res, ex);
    }

})

router.get('/Category/:id', async (req, res) => {

    try {
        Category.find(req.params.id, (err, data) => {
            if (!err) return res.status(200).send(data);
            else return returnMessage.globalOne(false, 400, "No categories found", res, err);
        });
    } catch (ex) {
        return returnMessage.globalOne(false, 501, "server side error occurred! Please try again shortly..", res, ex);
    }
})


router.put('/Category/:id', (req, res) => {


    try {

        if (!mongoObjectId.isValid(req.params.id))
            return returnMessage.globalOne(false, 400, "There No record with this id", res, "");

        const { error, isValid } = validationCategoryInput(req.body);

        if (isValid === false)
            return returnMessage.globalOne(isValid, 400, error, res,"");

        const categoryUpdate = {
            categoryName: req.body.categoryName,
            description: req.body.description,
            imageUrl: req.body.imageUrl
        };

        Category.findByIdAndUpdate(req.params.id, { $set: categoryUpdate }, { new: true, useFindAndModify: false }, (err, data) => {

            if (err) return returnMessage.globalOne(false, 400, "Category updating error", res, err);
            else return returnMessage.globalOne(false, 200, "Category " + data.categoryName + " updated successfully", res, "");

        })


    } catch (ex) {
        return returnMessage.globalOne(false, 501, "server side error occurred! Please try again shortly..", res, ex);
    }




})


module.exports = router;