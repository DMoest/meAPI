var express = require('express');
var router = express.Router();

router.get("/", function(request, response, next) {
    const data = {
        data: {
            message: "Hello World! This is 'REPORTS' GET route."
        }
    };

    return response.json(data);
});

router.post("/", function(request, response, next) {
    const data = {
        data: {
            message: "Hello World! This is 'REPORTS' POST route."
        }
    };

    return response.json(data);
});

module.exports = router;
