var returnMessage = exports.returnMessage = {};

returnMessage.userSignInReturnMessage = (isValid, Email, Password, Description) => {
    return {
        isValid: isValid,
        Email: Email,
        Password: Password,
        Description: Description
    }
}

