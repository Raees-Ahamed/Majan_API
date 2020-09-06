var express = require('express');
var router = express.Router();
const Category = require('../Models/Category');
const validationCategoryInput = require("../validation/Category");



router.post('/Category', async (req, res) => {

    try {

        const { error, isValid } = validationCategoryInput(req.body);

        if (isValid === false) {
            return res.status(400).send({
                isValid: isValid,
                description: error
            })
        }



        Category.findOne({
            categoryName: req.body.categoryName
        }).then(category => {

            if (category) {

                return res.status(400).send({
                    isValid: false,
                    description: "Category already present with this name"
                });

            } else {

                let category = new Category({

                    categoryName: req.body.categoryName,
                    description: req.body.description,
                    imageUrl: req.body.imageUrl

                });


                category.save((err, data) => {
                    if (err) {

                        return res.status(400).send({
                            isValid: false,
                            description: "Category saving error.",
                        });

                    } else {
                        return res.status(200).send({
                            isValid: true,
                            description: "Category saved Successfuly",
                        });
                    }
                })
            }

        })



    } catch (ex) {
        return res.status(501).send({
            isValid: false,
            description: "server side error occurred! Please try again shortly.." 
        });
    }


})


router.get('/Category', async (req, res) => {

    try{
        Category.find((err,data)=>{
            if(!err)
               return res.status(400).send(data);
            else{
                return res.status(400).send({
                    isValid: false,
                    description: "No categories found." 
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



module.exports = router;