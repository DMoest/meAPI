let express = require('express');
let router = express.Router();

router.post("/", function(request, response, next) {
    const data = {
        data: {
            message: "Hello World! This is 'LOGIN' POST route."
        }
    };
    next();
    return response.json(data);
});

module.exports = router;
