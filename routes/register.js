let express = require('express');
let router = express.Router();

router
    .post("/", function(request, response) {
        const data = {
            data: {
                message: "Hello World! This is 'REGISTER' POST route."
            }
        };
        return response.json(data);
    });

module.exports = router;
