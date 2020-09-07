var returnMessage = exports.returnMessage = {};

returnMessage.userSignInReturnMessage = (isValid, Email, Password, Description) => {
    return {
        isValid: isValid,
        Email: Email,
        Password: Password,
        Description: Description
    }
}


returnMessage.globalOne = (isValid, statusCode, Description, res) => {
    return res.status(statusCode).send({
        isValid: isValid,
        Description: Description
    })
}


