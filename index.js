'use strict'

const { PORT } = require("./src/config")
const { sequelize } = require("./src/models")
const { start } = require("./src/server")




sequelize.sync().then(() => {
    start(PORT)
}).catch((e) => console.log(e))