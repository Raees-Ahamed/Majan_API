const Validator = require('validator');
const isEmpty = require('./is-empty');
const { isValidObjectId } = require('mongoose');

module.exports = function validationOrderInput(data) {
    debugger
    const errors = {};
    try {

    data.forEach((order, i) => {



        

            order.productId = !isEmpty(order.productId) ? order.productId : '';
            order.quantity = !isEmpty(order.quantity) ? order.quantity : 0;


            if (Validator.isEmpty(order.productId) && order.quantity === 0) {
                errors.order = 'Please fill all fields';

                throw {
                    error: errors.category,
                    isValid: false
                };
               


            }
            else if (Validator.isEmpty(order.productId)) {
                errors.productId = 'Product cannot be empty';

                throw {
                    error: errors.productId,
                    isValid: false
                };
            }
            else if (order.quantity === 0) {
                errors.quantity = 'Quantity cannot be zero';
                throw {
                    error: errors.quantity,
                    isValid: false
                };
            }



      



    });



} catch (ex) {
    return ex

}








};