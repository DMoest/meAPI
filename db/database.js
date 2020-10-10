/* --- Require database dependencies --- */
let sqlite3 = require('sqlite3').verbose();

/* --- Module Exports dependent on server 'mode' --- */
module.exports = (function () {
    if (process.env.NODE_ENV === "test") {
        return new sqlite3.Database(process.env.DATABASE_TEST);
    }

    return new sqlite3.Database(process.env.DATABASE);
})();
