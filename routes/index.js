let express = require('express');
let router = express.Router();

router
    .get("/", function(request, response) {
        const data = {
          data: {
              message: "Hello World! This is 'INDEX' route."
          }
        };
        return response.json(data);
    });

module.exports = router;
