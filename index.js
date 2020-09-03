'use strict';

try {

    const express = require('express');
    const app = express();
    const cors = require('cors');
    const Logger = require('./Logger/Logger').Logger;
    const bodyParser = require("body-parser");
    const prefix = '/webapi.api';
    const port = 3001 | process.env.port;
    const mongoose = require('mongoose');
    const db = require('./config/keys').mongoURI;




    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());


    let corsOptions = {
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

        mongoose
            .connect(db, { useNewUrlParser: true , useUnifiedTopology:true})
            .then(() => Logger.info("DB Connected"))
            .catch(err => Logger.error("DB Connecting error " + err));

 

        app.use(prefix, require('./Routes/Home'));
        app.use(prefix, require('./Routes/User'));
        app.use(prefix, require('./Routes/Category'));




        

    });


} catch (ex) {
    console.log(ex)
}


