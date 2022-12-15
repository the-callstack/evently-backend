'use strict';

const errorHandler = (err, req, res, next) => {
    const { status, msg } = err;
    console.log(err);
    res.status(status).send(msg);
};

module.exports = errorHandler;