const Validator = require('validator');
const isEmpty = require('./is-empty');
const returnMessage = require('./MessageHandelling').returnMessage;

module.exports = function validationOrderInput(data) {
    const errors = {};
    try {



        data.firstName = !isEmpty(data.firstName)? data.firstName : '';
        data.lastName = !isEmpty(data.lastName)? data.lastName : '';
        data.address = !isEmpty(data.address)? data.address : '';
        data.city = !isEmpty(data.city)? data.city : '';
        data.contactNo = !isEmpty(data.contactNo)? data.contactNo : '';
        data.cardName = !isEmpty(data.cardName)? data.cardName : '';
        data.cardNo = !isEmpty(data.cardNo)? data.cardNo : '';
        data.expiryDate = !isEmpty(data.expiryDate)? data.expiryDate : '';
        data.cvNo = !isEmpty(data.cvNo)? data.cvNo : '';


        if (Validator.isEmpty(data.firstName)) {
            return returnMessage.userOrderValidation(false, false, true, true, true, true, true, true, true, true, true, "first name cannot be blank")
        }
        else if (Validator.isEmpty(data.lastName)) {
            return returnMessage.userOrderValidation(false, true, false, true, true, true, true, true, true, true, true, "last name cannot be blank")
        }
        else if (Validator.isEmpty(data.address)) {
            return returnMessage.userOrderValidation(false, true, true, false, true, true, true, true, true, true, true, "Address cannot be blank")
        }
        else if (Validator.isEmpty(data.city)) {
            return returnMessage.userOrderValidation(false, true, true, true, false, true, true, true, true, true, true, "City cannot be blank")
        }
        else if (typeof (data.contactNo) === 'number' && data.contactNo === 0) {
            return returnMessage.userOrderValidation(false, true, true, true, true, false, true, true, true, true, true, "Contact number cannot be blank")
        }
        else if (typeof (data.contactNo) != 'number' && data.contactNo === "") {
            return returnMessage.userOrderValidation(false, true, true, true, true, false, true, true, true, true, true, "Contact number cannot be blank")
        }
        else if (Validator.isEmpty(data.cardName)) {
            return returnMessage.userOrderValidation(false, true, true, true, true, true, false, true, true, true, true, "card name cannot be blank")
        }
        else if (typeof (data.cardNo) === 'number' && data.cardNo === 0) {
            return returnMessage.userOrderValidation(false, true, true, true, false, true, true, false, true, true, true, "card umber cannot be blank")
        }
        else if (typeof (data.cardNo) != 'number' && data.cardNo === "") {
            return returnMessage.userOrderValidation(false, true, true, true, false, true, true, false, true, true, true, "card umber cannot be blank")
        }
        else if (Validator.isEmpty(data.expiryDate)) {
            return returnMessage.userOrderValidation(false, true, true, true, false, true, true, true, false, true, true, "card expire date cannot be blank")
        }
        else if (typeof (data.cvNo) === 'number' && data.cvNo === 0) {
            return returnMessage.userOrderValidation(false, true, true, true, false, true, true, true, true, false, true, "card cvno cannot be blank")
        }
        else if (typeof (data.cvNo) != 'number' && data.cvNo === "") {
            return returnMessage.userOrderValidation(false, true, true, true, false, true, true, true, true, false, true, "card cvno cannot be blank")
        }



        data.cartItems.forEach((order, i) => {

            order.productId = !isEmpty(order.productId) ? order.productId : '';
            order.quantity = !isEmpty(order.quantity) ? order.quantity : 0;


            if (order.quantity === 0) {
                errors.quantity = 'Quantity cannot be zero';
                throw returnMessage.userOrderValidation(false, true, true, true, false, true, true, true, true, true, false, "quantity of" + order.productName + "cannt be zero");
            }

        });

        return returnMessage.userOrderValidation(true, true, true, true, false, true, true, true, true, true, true, "");


    } catch (ex) {
        return ex
    }

};