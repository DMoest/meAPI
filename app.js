const express = require("express"); // Import Express
const bodyParser = require("body-parser"); // Import BodyParser
const morgan = require("morgan"); // Import Morgan for third party logging
const app = express(); // Create constant "app" to run Express through
const port = 1337; // Set port 1337

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

"use strict";



/* --- Routes --- */
app.get("/", (request, response) => {
   const data = {
       data: {
           message: "Hello World!"
       }
   };

   return response.json(data);
});

app.get("/user", (request, response) => {
    response.json({
        data: {
            message: "Got a GET request, sending back 201 Created."
        }
    });
});

app.post("/user", (request, response) => {
    response.status(201).json({
       data: {
           message: "Got a POST request, sending back status 201 Created."
       }
    });
});

app.put("/user", (request, response) => {
    response.status(204).send();
});

app.delete("/user", (request, response) => {
    response.status(204).send();
});

app.get("/hello/:message", (request, response) => {
    const data = {
        data: {
            message: request.params.message
        }
    };

    response.json(data);
});

// Start up server
app.listen(port, () => console.info(`API listening to port ${port}!`));
