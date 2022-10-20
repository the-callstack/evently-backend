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
        findOneByEmailOrPhone: async (email, phone = 0) => {
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
                            // nested: true,
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
}

const canCreateOneRecord = (model) => {
    return {
        create: async (data) => {
            try {
                return await model.create(data)
            } catch (e) {
                throw new Error(e.message)
            };
        }
    }
}

const canCreateInBulk = (model) => {
    return {
        createInBulk: async (data) => {
            try {
                return await model.bulkCreate(data)
            } catch (error) {
                throw new Error(error.message)
            }
        }
    }
}


const canCreateWithNested = (model) => {
    return {
        createWithNested: async (data, children) => {
            const associated = children.map((child) => {
                return {
                    association: child,

                }
            })
            return await model.create(
                data,
                {
                    include: [...associated]
                }
            )
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
                    attributes: { exclude: ['password'] }
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
                        // nested: true,
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


const canUpdateInBulk = (model) => {
    return {
        updateInBulk: async (data, fields) => {
            try {
                return model.bulkCreate(
                    data,
                    {
                        updateOnDuplicate: fields,
                    }

                )
            } catch (error) {
                throw new Error(error.message)
            }
        }
    }
}


const canIncrementValue = (model) => {
    return {
        incrementValue: async (id, data) => {
            return await model.increment(
                data,
                {
                    where: { id },
                },
            )
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


const createTrackerCollection = (model) => {
    return {
        ...canCreateOneRecord(model),
        ...canCreateInBulk(model),
        ...canIncrementValue(model)
    }
}

const createAuthCollection = (model) => {
    return {
        ...canFindByEmailOrPhone(model),
        // ...canFindByPhone(model)
    }
}


const createOrderCollection = (model) => {
    return {
        ...canCreateWithNested(model),
        ...canReadAllRecords(model),
        ...canUpdateRecord(model),
        ...canDestroyRecord(model),
        ...canReadPopulatedRecords(model),
        ...canPopulateOneRecordById(model),
        ...canCreateOneRecord(model)
    }
}


const createOrderDetailsCollection = (model) => {
    return {
        ...canCreateInBulk(model),
    }
}

const createSaleItemCollection = (model) => {
    return {
        ...canReadAllRecords(model),
        ...canPopulateOneRecordById(model),
        ...canUpdateRecord(model),
        ...canDestroyRecord(model),
        ...canCreateOneRecord(model),
        ...canIncrementValue(model)
    }
}



module.exports = {
    createGenericCollections,
    createAuthCollection,
    createSaleItemCollection,
    createOrderDetailsCollection,
    createOrderCollection,
    createTrackerCollection
}