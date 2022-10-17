'use strict'

const read = (model) => {
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



const findByEmail = (model) => {
    return {
        findOneByEmail: async (email) => {
            try {
                return await model.findOne({
                    where: { email }
                })
            } catch (e) {
                throw new Error(`Server Error`)
            }
        }
    }

}




const populateById = (model) => {
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

const createRecord = (model) => {
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


const update = (model) => {
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

const destroy = (model) => {
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


const readAllRecords = (model) => {
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
        ...read(model),
        ...update(model),
        ...destroy(model),
        ...readAllRecords(model),
        ...populateById(model),
        ...createRecord(model)
    }
}


const createAuthCollection = (model) => {
    return {
        ...findByEmail(model)
    }
}

module.exports = {
    createGenericCollections,
    createAuthCollection
}