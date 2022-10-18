'use strict'

const { authCollection } = require("../../../models")




const isEmailExist = async (email) => {
    const user = await authCollection.findOneByEmailOrPhone(email)
    if (user) {
        return user
    } else {
        throw new Error(`User doesn't exist`)
    }
}

const isEmailOrPhoneUnique = async (email, phone) => {
    const user = await authCollection.findOneByEmailOrPhone(email, phone)
    if (!user) {
        return true
    } else {
        throw new Error(`Email or Phone number already used`)
    }
}


// const isPhoneUnique = async (phone) => {
//     const user = await authCollection.findOneByPhone(phone)
//     if (!user) {
//         return true
//     } else {
//         throw new Error(`Phone number already used`)
//     }
// }

module.exports = {
    isEmailExist,
    isEmailOrPhoneUnique
}