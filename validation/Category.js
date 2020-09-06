const Validator = require('validator');
const isEmpty = require('./is-empty');
const { isValidObjectId } = require('mongoose');

module.exports = function validationCategoryInput(data) {
    let errors = {};

    data.categoryName = !isEmpty(data.categoryName) ? data.categoryName : '';
    data.description = !isEmpty(data.description) ? data.description : '';
    data.imageUrl = !isEmpty(data.imageUrl) ? data.imageUrl : '';


    if (Validator.isEmpty(data.categoryName) && Validator.isEmpty(data.description) && Validator.isEmpty(data.imageUrl)) {
        errors.category = 'Please fill all fields';
        return {
            error: errors.category,
            isValid: false
        };
    }

    else if (Validator.isEmpty(data.categoryName)) {
        errors.categoryName = 'Category name is required';
        return {
            error: errors.categoryName,
            isValid: false
        };
    }
    else if (Validator.isEmpty(data.description)) {
        errors.description = 'Category description is required';
        return {
            error: errors.description,
            isValid: false
        };
    }
    else if (Validator.isEmpty(data.imageUrl)) {
        errors.imageUrl = 'Category image is required';
        return {
            error: errors.imageUrl,
            isValid: false
        };
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };

};