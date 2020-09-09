var middleware = exports.middleware = {};
const Logger = require('../Logger/Logger').Logger;
const returnMessage = require('../validation/MessageHandelling').returnMessage;



middleware.errorHandelling = (err, req, res, next) => {
    if (err) {
        returnMessage.globalOne(false, 500, "Something broke!", res,err.stack)
    }
}


middleware.log = (req, res, next) => {
    Logger.userRequests('Url -' + req.originalUrl + ' headers - ' + JSON.stringify(req.headers));
    next();
}
