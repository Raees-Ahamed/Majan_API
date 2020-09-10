var express = require('express');
var router = express.Router();
const hbs = require('nodemailer-express-handlebars');


router.get('/', function (req, res, next) {
    oderInvoiceGeneration();
    res.send("API hosted .. ");
});





module.exports = router;