let express = require('express');
let router = express.Router();


router
    .get("/", function(request, response) {
        const data = {
            data: {
                "message": "Hello World! This is 'REPORTS' GET route."
            }
        };

        return response.json(data);
    })
    .post("/", function(request, response) {
    const data = {
        data: {
            "message": "Hello World! This is 'REPORTS' POST route."
        }
    };

    console.log(request.body);
    return response.json(data);
});

module.exports = router;
