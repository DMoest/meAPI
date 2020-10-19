let express = require('express');
let router = express.Router();

router
    .get("/", function(request, response) {
        const data = {
            data: {
                "message": "Hello World! This is 'REPORTS' GET route."
            }
        };

        console.log("REQ.BODY: ", request.body);
        response.json(data);
    })
    .post("/", function(request, response) {
        const data = {
            data: {
                "message": "Hello World! This is 'REPORTS' POST route."
            }
        };

        console.log("REQ.BODY: ", request.body);
        response.json(data);
    });

router
    .get("/kmom/:id", function(request, response) {
        let id = request.params.id
        const data = {
            data: {
                "message": `Report for Kmom ${id}.`
            }
        };

        console.log("REQ.BODY: ", request.params);
        response.json(data);
    });

module.exports = router;
