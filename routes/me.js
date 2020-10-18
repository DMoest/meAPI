let express = require('express');
let router = express.Router();

router
    .get("/", function(request, response) {
        const data = {
            data: {
                message: "Hello World! This is 'ME' route."
            }
        };
        return response.json(data);
    });

module.exports = router;
