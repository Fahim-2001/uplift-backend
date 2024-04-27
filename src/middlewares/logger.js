const fs = require("fs");
const loggerMiddleware = (req, res, next) => {
    const log = `${req.method} - ${
        req.url
    } - ${req.status} - [${new Date().toLocaleString()}] - [${req.ip}]`;
    console.log(log);

    //   Appending log into log.txt
    fs.appendFile("log.txt",log + "\n", (err) => {
        if (err) {
            console.log(err.message);
            return;
        }
    });
    next();
};

module.exports = {
    loggerMiddleware,
};
