/*
* Application: Me API
* ------------------------------
* @author Daniel Andersson, daap19
* Built for course JS-Ramverk @ Blekinge Institute of Technologies.
*/

"use strict";

/* --- Require Express --- */
const express = require("express"); // Require Express
const app = express(); // Create constant "app" to run Express through
const router = express.Router(); // Set router constant

/* --- Require dotenv --- */
require('dotenv').config(); // Run config method for dotenv package

/* --- Set port from .env file --- */
const port = process.env.PORT; // Set port through .env file

/* --- Required Dependencies for Application --- */
const bodyParser = require("body-parser"); // Require BodyParser
const cors = require("cors"); // Require CORS (cross-origin resource sharing)
const morgan = require("morgan"); // Require Morgan for third party logging

/* --- Require database --- */
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(process.env.DATABASE);

/* --- Require BCryptJS --- */
const bcrypt = require('bcryptjs');
const saltRounds = 12;
const myPlaintextPassword = process.env.PASSWORD;
const hash = process.env.PASSWORD;

/* --- Require jsonwebtoken --- */
const jwt = require('jsonwebtoken');

/* --- Require Routes --- */
const indexRoute = require('./routes/index');
const helloRoute = require('./routes/hello');

/* --- Application use CORS --- */
app.use(cors());

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

/* --- Application use CORS --- */
app.use(cors());

/* --- Application use routes --- */
app.use('/', indexRoute);
app.use('/hello', helloRoute);

/* --- Insert to database --- */
db.run("insert into users (email, password) values (?, ?)",
    process.env.USER,
    process.env.PASSWORD, (error) => {
        if (error) {
            console.info("Error @ database insert.");
            console.info("Could depend on user already exists in database.");
            return error;
        }

        return console.info("Database insert success!");
    });

/* --- BCrypt save passwords to db --- */
bcrypt.hash(myPlaintextPassword, saltRounds, function(error, hash) {
    // Save passwords to database.
});

/* --- BCrypt compare password to database --- */
bcrypt.compare(myPlaintextPassword, hash, function(error, response) {
    // Response now contains true/false dependent on if its the right password or not.
});

/* --- JWT config-object --- */
const payload = {
    email: "d.andersson@example.com"
};
const secret = process.env.JWT_SECRET;
const token = jwt.sign(payload, secret, {
    expiresIn: '30min'
});

/* --- JWT Verify --- */
jwt.verify(token, process.env.JWT_SECRET, function(error, decoded) {
   if (error) {
     console.log("Error to verify JWT Token. ", error);
   }

   console.log("JWT Token verified successfully. ", decoded);
});

/* --- Check JWT --- */
router.post("/reports",
    (request, response, next) => checkToken(request, response, next),
    (request, response) => reports.addReport(response, request.body))

function checkToken(request, response, next) {
    const token = request.headers['x-access-token'];

    jwt.verify(token, process.env.JWT_SECRET, function(error, decoded) {
        if (error) {
            // Send error response
            console.log("Check Token Error: ", error);
        }
        next();
    });
}

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
        errors: [
            {
                status: error.status,
                title: error.message,
                detail: error.message
            }
        ]
    });
});



/* --- Start up server --- */
app.listen(port, () => console.info(`API listening to port ${port}!`));
