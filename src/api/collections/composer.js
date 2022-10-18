'use strict'

const canReadAllRecords = (model) => {
    return {
        readAllRecords: async () => {
            try {
                return await model.findAll({})
            } catch (e) {
                throw new Error(`Server Error`)
            }
        }
    }
}

const canPopulateOneRecordById = (model) => {
    return {
        populateById: async (id, args) => {
            if (args) {
                const data = args.map((model) => {
                    return {
                        association: model
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
                    returning: true
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
                        association: model
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
                        nested: true
                    }
                })
            } catch (e) {
                throw new Error(`Server Error`)

            }
        }
    }
}

const createCollections = (model) => {
    return {
        ...canReadAllRecords(model),
        ...canUpdateRecord(model),
        ...canDestroyRecord(model),
        ...canReadPopulatedRecords(model),
        ...canPopulateOneRecordById(model),
        ...canCreateOneRecord(model)
    }
}

module.exports = createCollections