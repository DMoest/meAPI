var express = require('express');
var router = express.Router();

router.post("/", function(request, response, next) {
    const data = {
        data: {
            message: "Hello World! This is 'LOGIN' POST route."
        }
    };

    return response.json(data);
});

module.exports = router;
