'use strict'

const errorHandler = (err, req, res, next) => {
    const { status, message } = err
    res.status(status).send(message)
}

module.exports = errorHandler