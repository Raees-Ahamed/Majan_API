var express = require('express');
var router = express.Router();
const Category = require('../Models/Category');
const validationCategoryInput = require("../validation/Category");
const returnMessage = require('../validation/MessageHandelling').returnMessage;



router.post('/Category', async (req, res) => {

    try {

        const { error, isValid } = validationCategoryInput(req.body);

        if (isValid === false)
            return returnMessage.globalOne(isValid, 400, error, res);



        Category.findOne({
            categoryName: req.body.categoryName
        }).then(category => {

            if (category)
                return returnMessage.globalOne(false, 400, "Category already present with this name", res);

            else {

                let category = new Category({
                    categoryName: req.body.categoryName,
                    description: req.body.description,
                    imageUrl: req.body.imageUrl
                });


                category.save((err, data) => {
                    if (err) return returnMessage.globalOne(false, 400, "Category saving error", res);
                    else
                        return returnMessage.globalOne(true, 200, "Category saved Successfuly", res);
                });
            }

        })



    } catch (ex) {
        return returnMessage.globalOne(false, 501, "server side error occurred! Please try again shortly..", res);
    }


})


router.get('/Category', async (req, res) => {

    try {
        Category.find((err, data) => {
            if (!err)
                return res.status(200).send(data);
            else
                return returnMessage.globalOne(false, 400, "No categories found", res);
        });
    } catch (ex) {
        return returnMessage.globalOne(false, 501, "server side error occurred! Please try again shortly..", res);
    }

})



module.exports = router;