const Validator = require('validator');
const isEmpty = require('./is-empty');
const { isValidObjectId } = require('mongoose');

module.exports = function validateProductInput(data) {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name: '';
    data.description = !isEmpty(data.description) ? data.description: '';
    data.imageUrl = !isEmpty(data.imageUrl) ? data.imageUrl: '';
    data.categoryId = !isEmpty(data.categoryId) ? data.categoryId: '';
    data.availableQuantity = !isEmpty(data.availableQuantity) ? data.availableQuantity: '';
    data.unitPrice = !isEmpty(data.unitPrice) ? data.unitPrice: '';
    data.originPrice = !isEmpty(data.originPrice) ? data.originPrice: '';
    data.discountPercent = !isEmpty(data.discountPercent) ? data.discountPercent: '';
    data.currency = !isEmpty(data.currency) ? data.currency: '';

    if(Validator.isEmpty(data.name)) {
        errors.name = 'Name is invalid';
    }

    if(Validator.isEmpty(data.categoryId)) {
        errors.category = 'Category ID field is required';
    }

    if(Validator.isEmpty(data.imageUrl)) {
        errors.imageUrl = 'Image Url field is required';
    }

    if(Validator.isEmpty(data.description)) {
        errors.description = 'Description field is required';
    }

    if(Validator.isEmpty(data.availableQuantity)) {
        errors.availableQuantity = 'Quantity field is required';
    }

    if(Validator.isEmpty(data.unitPrice)) {
        errors.unitPrice = 'Unit Price field is required';
    }

    if(Validator.isEmpty(data.originPrice)) {
        errors.originPrice = 'Origin Price field is required';
    }

    if(Validator.isEmpty(data.discountPercent)) {
        errors.discountPercent = 'Discount Precent field is required';
    }

    if(Validator.isEmpty(data.currency)) {
        errors.currency = 'Currency field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};