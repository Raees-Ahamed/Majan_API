const returnMessage = (isValid, Email, Password, Description ) => {
    return {
        isValid:isValid,
        Email:Email,
        Password:Password,
        Description:Description
    }
}

module.exports = returnMessage;