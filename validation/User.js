const Validator = require('validator');
const isEmpty = require('./is-empty');
const userValidations = exports.userValidations = {};
const returnMessage = require('./MessageHandelling').returnMessage;

userValidations.validateSignIn = function (email, pwd) {

    try {

        email = !isEmpty(email) ? email : '';
        pwd = !isEmpty(pwd) ? pwd : '';


        if (email === 'unsafe' && pwd === 'unsafe')
            return returnMessage.userSignInValidation(false, false, false, "Please enter userName and Password");


        else if (Validator.isEmpty(email) || email === 'unsafe')
            return returnMessage.userSignInValidation(false, false, true, "Email is required");



        else if (!Validator.isEmail(email))
            return returnMessage.userSignInValidation(false, false, true, "Invalid email address");



        else if (Validator.isEmpty(pwd) || pwd === 'unsafe')
            return returnMessage.userSignInValidation(false, true, false, "Password is required");

        else
            return returnMessage.userSignInValidation(true, true, true, "");





    } catch (ex) {
        return returnMessage(false, false, false, ex);
    }




};


userValidations.validateSignUp = function (body) {


    try {

        body.firstName = !isEmpty(body.firstName) ? body.firstName : '';
        body.lastName = !isEmpty(body.lastName) ? body.lastName : '';
        body.email = !isEmpty(body.email) ? body.email : '';
        body.mobileNum = !isEmpty(body.mobileNum) ? body.mobileNum : '';
        body.password = !isEmpty(body.password) ? body.password : '';
        body.confirmPassword = !isEmpty(body.confirmPassword) ? body.confirmPassword : '';


        if (Validator.isEmpty(body.firstName))
            return returnMessage.userSignUpValidation(false, false, true, true, true, true, true, "First Name field is required");


        else if (Validator.isEmpty(body.lastName))
            return returnMessage.userSignUpValidation(false, true, false, true, true, true, true, "Last Name field is required");

        else if (Validator.isEmpty(body.email))
            return returnMessage.userSignUpValidation(false, true, true, false, true, true, true, "Email field is required");

        else if (!Validator.isEmail(body.email))
            return returnMessage.userSignUpValidation(false, true, true, false, true, true, true, "Email is invalid");


        else if (typeof (body.mobileNum) != 'number' && Validator.isEmpty(body.mobileNum))
            return returnMessage.userSignUpValidation(false, true, true, true, false, true, true, "Mobile number is rerquired");

        else if (typeof (body.mobileNum) === 'number' && body.mobileNum === 0)
            return returnMessage.userSignUpValidation(false, true, true, true, false, true, true, "Mobile number is rerquired");


        else if (Validator.isEmpty(body.password))
            return returnMessage.userSignUpValidation(false, true, true, true, true, false, true, "Password field is required");


        else if (!Validator.isLength(body.password, { min: 6, max: 30 }))
            return returnMessage.userSignUpValidation(false, true, true, true, true, false, true, "Password must be at least 6 characters");


        else if (Validator.isEmpty(body.confirmPassword))
            return returnMessage.userSignUpValidation(false, true, true, true, true, true, false, "Confirm Password field is required");


        else if (!Validator.equals(body.password, body.confirmPassword))
            return returnMessage.userSignUpValidation(false, true, true, true, true, true, false, "Password must match");


        else
            return returnMessage.userSignUpValidation(true, true, true, true, true, true, true, "");

    } catch (ex) {
        return returnMessage.userSignUpValidation(false, false, false, false, false, false, false, ex);
    }







}

