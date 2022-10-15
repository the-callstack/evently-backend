'use strict'

const AppError = require("./error-class")

const pageNotFoundHandler = (req, res, next) => {
    next(new AppError(404, 'Page Not Found'))
}

module.exports = pageNotFoundHandler