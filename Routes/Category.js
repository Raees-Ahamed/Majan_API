var express = require('express');
var router = express.Router();
const Category = require('../Models/Category');



router.post('/Category', async (request, result) => {

    try {

        Category.findOne({
            categoryName: request.body.categoryName
        }).then(category => {

            if (category) {

                return result.status(400).send({
                    isValid: false,
                    description: "Category already present with this name"
                });

            } else {

                let category = new Category({

                    categoryName: request.body.categoryName,
                    description: request.body.description,
                    imageUrl: request.body.imageUrl

                });


                category.save((err, data) => {
                    if (err) {

                        return result.status(400).send({
                            isValid: false,
                            description: "Category saving error.",
                        });

                    } else {
                        return result.status(400).send({
                            isValid: true,
                            description: "Category saved Successfuly",
                        });
                    }
                })
            }

        })



    } catch (ex) {
        return result.status(501).send({
            isValid: false,
            description: "server side error occurred! Please try again shortly.." 
        });
    }


})


router.get('/Category', async (request, result) => {

    try {

        Category.find((err,data)=>{

            if(!err){
               return result.status(400).send(data);
            }
            else{
                return result.status(400).send({
                    isValid: false,
                    description: "Category geeting error." 
                });
            }


        })


    } catch (ex) {
        return result.status(501).send({
            isValid: false,
            description: "server side error occurred! Please try again shortly.." 
        });
    }

})



module.exports = router;