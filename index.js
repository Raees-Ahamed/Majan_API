try {

    const express = require('express');
    const cors = require('cors');
    const bodyParser = require("body-parser");
    const mongoose = require('mongoose');
    const path = require('path');

    //--------------
    const prefix = '/webapi.api';
    const port = 3001 | process.env.port;

    //--------------
    const db = require('./config/keys').mongoURI;
    const Logger = require('./Logger/Logger').Logger;
    const middleware = require("./middlewares/middleware").middleware;


    const app = express();

    app.use(middleware.log);
    app.use(middleware.errorHandelling);

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());


    let corsOptions = {
        origin: 'http://localhost:3000',
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: true,
        optionsSuccessStatus: 200
    }

    app.use(cors());
    app.options(corsOptions, cors());

    if (process.env.NODE_ENV === 'production') {
        app.use(express.static('client/build'));
        app.get('*', (req, res) => {
            res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
        });
    }

    app.listen(port, () => {
        Logger.info("API hosted successfully for port " + port);
        console.log("API api hosted successfully for port " + port);


        mongoose
            .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => { Logger.info("DB Connected"); console.log("DB Connected") })
            .catch(err => Logger.error("DB Connecting error " + err));


        app.use(prefix, require('./Routes/Home'));
        app.use(prefix, require('./Routes/User'));
        app.use(prefix, require('./Routes/Category'));
        app.use(prefix, require('./Routes/Product'));
        app.use(prefix, require('./Routes/Order'));
        app.use(prefix, require('./Routes/Product-Category'));
        app.use(prefix, require('./Routes/Dashbord'));
        app.use(prefix, require('./Routes/Selling'));


    });


} catch (ex) {
    console.log(ex);
}


