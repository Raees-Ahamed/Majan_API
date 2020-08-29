'use strict';

try {

    var express = require('express');
    var app = express();
    var cors = require('cors');
    var Logger = require('./Logger/Logger').Logger;
    var bodyParser = require("body-parser");
    var prefix = '/webapi.api';
    var port = 3000 | process.env.port;



    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());


    var corsOptions = {
        origin: 'http://localhost:3000',
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: true,
        optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
    }

    app.use(cors());
    app.options(corsOptions, cors());


    app.listen((port), function () {
        Logger.info("API hosted successfully for port " + port);
        console.log("API api hosted successfully for port " + port);

        app.use(prefix, require('./Routes/Home'));



    });


} catch (ex) {
    console.log(ex)
}


