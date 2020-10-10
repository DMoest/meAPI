/*
* Application: Me API
* ------------------------------
* @author Daniel Andersson, daap19
* Built for course JS-Ramverk @ Blekinge Institute of Technologies.
*/

"use strict";

/* --- Require Express & Dependencies for Application --- */
const express = require("express"); // Require Express
const router = express.Router(); // Set router constant
const app = express(); // Create constant "app" to run Express through
const bodyParser = require("body-parser"); // Require BodyParser
const morgan = require("morgan"); // Require Morgan for third party logging
const cors = require("cors"); // Require CORS (cross-origin resource sharing)

/* --- Require dotenv & run configuration method --- */
require('dotenv').config(); // Run .config() method for dotenv package

/* --- Require database --- */
const db = require("./db/database.js");

/* --- Require BCryptJS --- */
const bcrypt = require('bcryptjs');
const saltRounds = 12;
const hash = "process.env.PASSWORD";
const myPlaintextPassword = process.env.PASSWORD;

/* --- Require jsonwebtoken --- */
const jwt = require('jsonwebtoken');

/* --- Set port from .env file --- */
const port = process.env.PORT; // Set port through .env file

/* --- Require Routes --- */
const indexRoute = require('./routes/index');
const helloRoute = require('./routes/hello');
const meRoute = require('./routes/me');
const reportsRoute = require('./routes/reports');
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');

/* --- Application use CORS --- */
app.use(cors());

/* --- Morgan setup to avoid logging 'test' --- */
if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}

/* --- BodyParser --- */
app.use(bodyParser.json()); // enable parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // enable parsing application/x-www-form7urlencoded

/* --- Middleware --- */
app.use((request, response, next) => {
    console.log(request.method);
    console.log(request.path);
    next();
});

/* --- Application use routes --- */
app.use('/', indexRoute);
app.use('/hello', helloRoute);
app.use('/me', meRoute);
app.use('/reports', reportsRoute);
app.use('/register', registerRoute);
app.use('/login', loginRoute);

/* --- BCrypt save passwords to db --- */
bcrypt.hash(myPlaintextPassword, saltRounds, function(error, hash) {
    // Save passwords to database.
    console.info("Check HASH:", hash);

    /* --- Insert to database --- */
    db.run("insert into users (email, password) values (?, ?)",
        process.env.USER,
        process.env.PASSWORD, (error) => {
            if (error) {
                console.info("Error @ user insert to database.");
                console.info("Could depend on user already exists in database.");
                return error;
            }

            return console.info("Database insert success!");
        });
});

/* --- BCrypt compare password to database --- */
bcrypt.compare(myPlaintextPassword, hash, function(error, response) {
    // Response now contains true/false dependent on if its the right password or not.
    if (response === true) {
        console.info("BCrypt password response: ", response);
    } else {
        console.info("BCrypt - There is an error occuring with authentication of the password.", error);
        console.info("BCrypt password response: ", response);
    }
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
    let error = new Error("Not Found");
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
const server = app.listen(port, () => console.info(`API listening to port ${port}!`));

module.exports = server;
