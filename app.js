const express = require("express");
const app = express();
const port = 1337;

"use strict";

// Add a route
app.get("/", (request, response) => {
   const data = {
       data: {
           message: "Hello World!"
       }
   };

   response.json;
});

app.post("/user", (request, response) => {
   response.status(201).json({
       data: {
           message: "Got a POST request."
       }
   });
});

app.put("/user", (request, response) => {
   response.status(204).send("204 No content");
/*   response.json({
        data: {
            message: "Got a PUT request."
        }
    });*/

});

app.delete("/user", (request, response) => {

   response.json({
       data: {
           message: "Got a DELETE request."
       }
   });
});

app.get("/hello/:message", (response, request) => {
    let data;

    data = {
        data: {
            message: request.params.message
        },
    };

    let errors = {
        "links": {
            "self": "http://localhost:1337/hello/:message"
        }
    };

    console.log(request.params);
    return response.json(data);
});

// Start up server
app.listen(port, () => console.info(`API listening to port ${port}!`));
