/*
* Application: Me API
* ------------------------------
* @author Daniel Andersson, daap19
* Built for course JS-Ramverk @ Blekinge Institute of Technologies.
*/

"use strict";

/* --- Required Dependencies for Application --- */
const bodyParser = require("body-parser"); // Require BodyParser
const morgan = require("morgan"); // Require Morgan for third party logging
const cors = require("cors"); // Require CORS (cross-origin resource sharing)

/* --- Require Express --- */
const express = require("express"); // Require Express
const app = express(); // Create constant "app" to run Express through
const port = 1337; // Set port 1337

/* --- Require database --- */
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/texts.sqlite');

/* --- Insert to database --- */
db.run("insert into users (email, password) values (?, ?)",
    "superlongtpassword", (error) => {
    if (error) {
        console.log("Error, database insert fail.");
        return error;
    }

    return console.info("Database insert success!");
});

/* --- Application use CORS --- */
app.use(cors());

/* --- Required Routes --- */
const indexRoute = require('./routes/index');
const helloRoute = require('./routes/hello');

/* --- Application use routes --- */
app.use('/', indexRoute);
app.use('/hello', helloRoute);

/* --- Morgan setup to avoid logging 'test' --- */
if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}

/* --- Middleware --- */
app.use((request, response, next) => {
    console.log(request.method);
    console.log(request.path);
    next();
});

/* --- BodyParser --- */
app.use(bodyParser.json()); // enable parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // enable parsing application/x-www-form7urlencoded

/* 404 - Route to catch errors on wrong routes */
app.use((request, response, next) => {
    var error = new Error("Not Found");
    error.status = 404;
    next(error);
});

app.use((error, request, response, next) => {
    if (response.headersSent) {
        return next(error);
    }

    response.status(error.status || 500).json({
        "errors": [
            {
                "status": error.status,
                "title": error.message,
                "detail": error.message
            }
        ]
    });
});

// Start up server
app.listen(port, () => console.info(`API listening to port ${port}!`));
