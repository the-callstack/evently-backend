'use strict'

const { Op } = require("../../config")

const canReadAllRecords = (model) => {
    return {
        readAllRecords: async () => {
            try {
                return await model.findAll({
                    attributes: { exclude: ['password'] }
                })
            } catch (e) {
                throw new Error(`Server Error`)
            }
        }
    }
}



const canFindByEmailOrPhone = (model) => {
    return {
        findOneByEmailOrPhone: async (email, phone) => {
            try {
                return await model.findOne({
                    where: {
                        [Op.or]: [
                            { email },
                            { phone }
                        ]
                    }
                })
            } catch (e) {
                throw new Error(`Server Error`)
            }
        }
    }
}


// const canFindByPhone = (model) => {
//     return {
//         findOneByPhone: async (phone) => {
//             try {
//                 return await model.findOne({
//                     where: { phone }
//                 })
//             } catch (e) {
//                 throw new Error(`Server Error`)
//             }
//         }
//     }
// }


const canPopulateOneRecordById = (model) => {
    return {
        populateById: async (id, args) => {
            if (args) {
                const data = args.map((model) => {
                    return {
                        association: model,
                        attributes: { exclude: ['password'] }
                    }
                })
                try {
                    return await model.findOne({
                        where: { id },
                        include: [...data]
                    })
                } catch (e) {
                    throw new Error(`Server Error`)
                }
            } else {
                try {
                    return await model.findOne({
                        where: { id },
                        include: {
                            all: true,
                            nested: true,
                        },
                        attributes: { exclude: ['password'] }

                    })
                } catch (e) {
                    throw new Error(`Server Error`)
                }
            }
        }
    }
}

const canCreateOneRecord = (model) => {
    return {
        create: async (data) => {
            try {
                return await model.create(data)
            } catch (e) {
                throw new Error(`Server Error`)
            };
        }
    }
}


const canUpdateRecord = (model) => {
    return {
        update: async (id, data) => {
            try {
                return await model.update(data, {
                    where: { id },
                    returning: true,
                    attributes: { exclude: ['password', 'refresh_token'] }
                })
            } catch (e) {
                throw new Error(`Server Error`)
            }
        }
    }
}

const canDestroyRecord = (model) => {
    return {
        destroy: async (id) => {
            try {
                return await model.destroy({
                    where: { id },
                    returning: true
                })
            } catch (e) {
                throw new Error(`Server Error`)
            }
        }
    }
}


const canReadPopulatedRecords = (model) => {
    return {
        readAllPopulated: async (args) => {
            if (args) {
                const data = args.map((model) => {
                    return {
                        association: model,
                        attributes: { exclude: ['password'] }
                    }
                })
                try {
                    return await model.findAll({
                        include: [...data],
                    })
                } catch (e) {
                    throw new Error(`Server Error`)

                }
            }
            try {
                return await model.findAll({
                    include: {
                        all: true,
                        nested: true,
                        attributes: { exclude: ['password'] }
                    },
                    attributes: { exclude: ['password'] }
                })
            } catch (e) {
                throw new Error(`Server Error`)

            }
        }
    }
}

const createGenericCollections = (model) => {
    return {
        ...canReadAllRecords(model),
        ...canUpdateRecord(model),
        ...canDestroyRecord(model),
        ...canReadPopulatedRecords(model),
        ...canPopulateOneRecordById(model),
        ...canCreateOneRecord(model)
    }
}


const createAuthCollection = (model) => {
    return {
        ...canFindByEmailOrPhone(model),
        // ...canFindByPhone(model)
    }
}

module.exports = {
    createGenericCollections,
    createAuthCollection
}