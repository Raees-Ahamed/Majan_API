var crypto = require('crypto');
let password = module.exports.password = {};

password.encrypt = encryptPassword = (pwd) => {
    return (crypto.createHash('sha256').update(pwd).digest("hex"));
}


password.decrypt = decryptPassword = (pwd) => {
    return (crypto.createHash('md5').update(pwd).digest("hex"));
}


