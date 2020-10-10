let express = require('express');
let router = express.Router();

router.get("/", function(request, response, next) {
    const data = {
        data: {
            message: "Hello World! This is 'ME' route."
        }
    };
    next();
    return response.json(data);
});

module.exports = router;
