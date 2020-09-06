const Validator = require('validator');
const isEmpty = require('./is-empty');
const userValidations = exports.userValidations = {};
const returnMessage = require('./MessageHandelling').returnMessage;

userValidations.validateSignIn = function (email, pwd) {

    try {

        email = !isEmpty(email) ? email : '';
        pwd = !isEmpty(pwd) ? pwd : '';


        if (email === 'unsafe' && pwd === 'unsafe')
            return returnMessage.userSignInReturnMessage(false, false, false, "Please enter userName and Password");


        else if (Validator.isEmpty(email) || email === 'unsafe')
            return returnMessage.userSignInReturnMessage(false, false, true, "Email is required");



        else if (!Validator.isEmail(email))
            return returnMessage.userSignInReturnMessage(false, false, true, "Invalid email address");



        else if (Validator.isEmpty(pwd) || pwd === 'unsafe')
            return returnMessage.userSignInReturnMessage(false, true, false, "Password is required");

        else
            return returnMessage.userSignInReturnMessage(true, true, true, "");





    } catch (ex) {
        return returnMessage(false, false, false, ex);
    }




};


userValidations.validateSignUp = function (body) {

    let errors = {};

    body.firstName = !isEmpty(body.firstName) ? body.firstName : '';
    body.lastName = !isEmpty(body.lastName) ? body.lastName : '';
    body.email = !isEmpty(body.email) ? body.email : '';
    body.password = !isEmpty(body.password) ? body.password : '';
    body.confirmPassword = !isEmpty(body.confirmPassword) ? body.confirmPassword : '';


    if (Validator.isEmpty(body.firstName)) {
        errors.firstName = 'First Name field is required';
        return {
            error: errors.firstName,
            isValid: isEmpty(errors)
        };
    }

    else if (Validator.isEmpty(body.lastName)) {
        errors.lastName = 'Last Name field is required';
        return {
            error: errors.lastName,
            isValid: isEmpty(errors)
        };
    }

    else if (Validator.isEmpty(body.email)) {
        errors.email = ' Email field is required';
        return {
            error: errors.email,
            isValid: isEmpty(errors)
        };
    }

    else if (!Validator.isEmail(body.email)) {
        errors.email = 'Email is invalid';
        return {
            error: errors.email,
            isValid: isEmpty(errors)
        };
    }

    else if (Validator.isEmpty(body.password)) {
        errors.password = 'Password field is required';
        return {
            error: errors.password,
            isValid: isEmpty(errors)
        };
    }

    else if (!Validator.isLength(body.password, { min: 6, max: 30 })) {
        errors.password = 'Password must be at least 6 characters';
        return {
            error: errors.password,
            isValid: isEmpty(errors)
        };
    }

    else if (Validator.isEmpty(body.confirmPassword)) {
        errors.confirmPassword = 'Confirm Password field is required';
        return {
            error: errors.confirmPassword,
            isValid: isEmpty(errors)
        };
    }

    else if (!Validator.equals(body.password, body.confirmPassword)) {
        errors.confirmPassword = 'Password must match';
        return {
            error: errors.confirmPassword,
            isValid: isEmpty(errors)
        };
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };



}

