var crypto = require('crypto');
let password = module.exports.password = {};

password.encrypt = encryptPassword = (pwd) => {
    return (crypto.createHash('sha256').update(pwd).digest("hex"));
}


