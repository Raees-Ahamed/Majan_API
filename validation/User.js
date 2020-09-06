const Validator = require('validator');
const isEmpty = require('./is-empty');
const userValidations = exports.userValidations = {};

userValidations.validateSignIn = function (email, pwd) {
    let errors = {};

    email = !isEmpty(email) ? email : '';
    pwd = !isEmpty(pwd) ? pwd : '';


    if(email==='unsafe' && pwd === 'unsafe'){
        return{
            error: "Please enter userName and Password",
            isValid: false
        }
    }


    else if (!Validator.isEmail(email)) {
        errors.email = 'Email is invalid';
        return {
            error: errors.email,
            isValid: isEmpty(errors)
        };
    }

    else if (Validator.isEmpty(email)) {
        errors.email = 'Email field is required';
        return {
            error: errors.email,
            isValid: isEmpty(errors)
        };
    }

    else if (Validator.isEmpty(pwd)) {
        errors.password = 'Password field is required';
        return {
            error: errors.password,
            isValid: isEmpty(errors)
        };
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

