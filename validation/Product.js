const Validator = require('validator');
const isEmpty = require('./is-empty');
const { isValidObjectId } = require('mongoose');

module.exports = function validateProductInput(data) {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name: '';
    data.description = !isEmpty(data.description) ? data.description: '';
    data.imageUrl1 = !isEmpty(data.imageUrl1) ? data.imageUrl1: '';
    data.categoryId = !isEmpty(data.categoryId) ? data.categoryId: '';
    data.availableQuantity = !isEmpty(data.availableQuantity) ? data.availableQuantity: '';
    data.unitPrice = !isEmpty(data.unitPrice) ? data.unitPrice: '';
    data.originPrice = !isEmpty(data.originPrice) ? data.originPrice: '';
    data.discountPercent = !isEmpty(data.discountPercent) ? data.discountPercent: '';
    data.currency = !isEmpty(data.currency) ? data.currency: '';

    if(Validator.isEmpty(data.name)) {
        errors.name = 'Name is invalid';
        return {
            error: errors.name,
            isValid: isEmpty(errors)
        };
    }

    else if(Validator.isEmpty(data.categoryId)) {
        errors.category = 'Category ID field is required';
        return {
            error: errors.category,
            isValid: isEmpty(errors)
        };
    }

    else if(Validator.isEmpty(data.imageUrl1)) {
        errors.imageUrl1 = 'Image Url field is required';
        return {
            error: errors.imageUrl1,
            isValid: isEmpty(errors)
        };
    }

    else if(Validator.isEmpty(data.description)) {
        errors.description = 'Description field is required';
        return {
            error: errors.description,
            isValid: isEmpty(errors)
        };
    }

    else if(typeof(data.availableQuantity) != 'number' && Validator.isEmpty(data.availableQuantity)) {
        errors.availableQuantity = 'Quantity field is required';
        return {
            error: errors.availableQuantity,
            isValid: isEmpty(errors)
        };
    }

    else if(typeof(data.unitPrice) != 'number' && Validator.isEmpty(data.unitPrice)) {
        errors.unitPrice = 'Unit Price field is required';
        return {
            error: errors.unitPrice,
            isValid: isEmpty(errors)
        };
    }

    else if(typeof(data.originPrice) != 'number' && Validator.isEmpty(data.originPrice)) {
        errors.originPrice = 'Origin Price field is required';
        return {
            error: errors.originPrice,
            isValid: isEmpty(errors)
        };
    }

    else if(typeof(data.discountPercent) != 'number' && Validator.isEmpty(data.discountPercent)) {
        errors.discountPercent = 'Discount Precent field is required';
        return {
            error: errors.discountPercent,
            isValid: isEmpty(errors)
        };
    }

    else if(Validator.isEmpty(data.currency)) {
        errors.currency = 'Currency field is required';
        return {
            error: errors.currency,
            isValid: isEmpty(errors)
        };
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
    
};