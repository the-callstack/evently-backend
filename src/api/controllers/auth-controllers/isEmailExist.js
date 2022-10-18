'use strict'

const { authCollection } = require("../../../models")




const isEmailExist = async (email) => {
    const user = await authCollection.findOneByEmail(email)
    if (user) {
        return user
    } else {
        throw new Error(`User doesn't exist`)
    }
}

module.exports = {
    isEmailExist
}