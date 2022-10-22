'use strict';

const errorHandler = (err, req, res, next) => {
    const { status, msg } = err;
    res.status(status).send(msg);
};

module.exports = errorHandler;