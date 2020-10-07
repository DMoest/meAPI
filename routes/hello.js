var express = require('express');
var router = express.Router();

router.get("/", function(request, response, next) {
    const data = {
        data: {
            message: "Hello World! This is 'HELLO' route."
        }
    };

    return response.json(data);
});

module.exports = router;
