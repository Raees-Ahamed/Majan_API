var returnMessage = exports.returnMessage = {};

returnMessage.userSignInValidation = (isValid, Email, Password, Description) => {
    return {
        isValid: isValid,
        Email: Email,
        Password: Password,
        Description: Description
    }
}


returnMessage.userSignUpValidation = (isValid, fName, lName, email, mobileNum, pwd, confirmPwd, Description) => {
    return {
        isValid: isValid,
        fName: fName,
        lName: lName,
        email: email,
        mobileNum: mobileNum,
        pwd: pwd,
        confirmPwd: confirmPwd,
        Description: Description
    }
}




returnMessage.userLogin = (isValid, Email, Password, Description, token, statusCode, res) => {
    return res.status(statusCode).send({
        isValid: isValid,
        Email: Email,
        Password: Password,
        Description: Description,
        token: token
    })
}

returnMessage.user = (isValid, fName, lName, email, mobileNum, pwd, confirmPwd, Description, token, statusCode, res, user) => {
    return res.status(statusCode).send({
        isValid: isValid,
        fName: fName,
        lName: lName,
        email: email,
        mobileNum: mobileNum,
        pwd: pwd,
        confirmPwd: confirmPwd,
        Description: Description,
        token: token,
        user:user
    })
}



returnMessage.globalOne = (isValid, statusCode, Description, res) => {
    return res.status(statusCode).send({
        isValid: isValid,
        Description: Description
    })
}


