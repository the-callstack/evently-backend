"use strict";

const { Op } = require("../../config");

const canReadAllRecords = (model) => {
  return {
    readAllRecords: async () => {
      try {
        return await model.findAll({
          attributes: { exclude: ["password"] },
        });
      } catch (e) {
        throw new Error(`Server Error`);
      }
    },
    readByUserId: async (id) => {
      try {
        return await model.findAll({
          where: { UserId: id },
          include: {
            association: "details",
          },
        });
      } catch (error) {
        throw new Error(error.message);
      }
    },
  };
};

const canReadAllRecordsWithCondition = (model) => {
  return {
    readAllRecordsWithCondition: async (condition) => {
      try {
        return await model.findAll({
          where: condition,
          attributes: { exclude: ["password"] },
        });
      } catch (e) {
        throw new Error(e.message);
      }
    },
    readAllRecordsBetween: async (price) => {
      try {
        console.log(price);
        return await model.findAll({
          where: {
            price:
            {
              [Op.between]: [0, price]
            }
          }
        });
      } catch (e) {
        throw new Error(e.message);
      }
    }
  };
};


const selectNestedItemsByEventandCatID = (model) => {
  return {
    selectItemsByEventCatId: async (EventId) => {
      try {
        return await model.findOne({
          where: { EventId },
          include: [{
            association: 'categories',
            include: ['rentalItems', 'saleItems']
          }]
        });
      } catch (error) {
        throw new Error(error.message);
      }
    }
  };
};

const canFindByEmailOrPhone = (model) => {
  return {
    findOneByEmailOrPhone: async (email, phone = 0) => {
      try {
        return await model.findOne({
          where: {
            [Op.or]: [{ email }, { phone }],
          },
        });
      } catch (e) {
        throw new Error(`Server Error`);
      }
    },
  };
};

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
    populateById: async (condition, args) => {
      if (args) {
        const data = args.map((model) => {
          return {
            association: model,
            attributes: { exclude: ["password"] },
          };
        });
        try {
          return await model.findOne({
            where: condition,
            include: [...data],
          });
        } catch (e) {
          throw new Error(e.message);
        }
      } else {
        try {
          const result = await model.findOne({
            where: condition,
            include: {
              all: true,
              // nested: true,
              attributes: { exclude: ["password"] },
            },
            attributes: { exclude: ["password"] },
          });
          return result;
        } catch (e) {
          throw new Error(e.message);
        }
      }
    },
  };
};

const canPopualteOneRecordWithNestedData = (model) => {
  return {
    populateWithNested: async (id, firstChild, children, categories) => {
      try {
        const data = children.map((model) => {
          return {
            association: model,
            // as: model,
            // attributes:{price}
            // limit: 1,
            // where: {
            //     price: {
            //         [Op.lt]: 15
            //     }
            // }
          };
        });
        return await model.findOne({
          where: { id },
          include: {
            association: firstChild,
            where: {
              id: categories,
            },
            // include: {
            //     association: 'rentalItems',
            //     where: {
            //         price: { [Op.lt]: 15 }
            //     }
            // }
            include: [...data],
          },
        });
      } catch (error) {
        throw new Error(error.message);
      }
    },
  };
};

const canCreateOneRecord = (model) => {
  return {
    create: async (data) => {
      try {
        return await model.create(data);
      } catch (e) {
        throw new Error(e.message);
      }
    },
  };
};

const canCreateInBulk = (model) => {
  return {
    createInBulk: async (data) => {
      try {
        return await model.bulkCreate(data);
      } catch (error) {
        throw new Error(error.message);
      }
    },
  };
};

const canCreateWithNested = (model) => {
  return {
    createWithNested: async (data, children) => {
      const associated = children.map((child) => {
        return {
          association: child,
        };
      });
      return await model.create(data, {
        include: [...associated],
      });
    },
  };
};

const canUpdateRecord = (model) => {
  return {
    update: async (id, data) => {
      try {
        return await model.update(data, {
          where: { id },
          returning: true,
          attributes: { exclude: ["password"] },
        });
      } catch (e) {
        throw new Error(e.message);
      }
    },
  };
};

const canDestroyRecord = (model) => {
  return {
    destroy: async (id) => {
      try {
        return await model.destroy({
          where: { id },
          // include: [
          //   { nested: "true" },
          //   { association: "saleItems" },
          //   { association: "rentalItems" }
          // ],

          returning: true,
        });
      } catch (e) {
        throw new Error(e.message);
      }
    },
  };
};

const canDestroyEventCatRecord = (model) => {
  return {
    destroyEventCat: async (id, categories) => {
      try {
        return await model.destroy({
          where: {
            [Op.and]: [{ EventId: id }, { CategoryId: categories }],
          },
          returning: true,
        });
      } catch (e) {
        throw new Error(e.message);
      }
    },
  };
};

const canReadPopulatedRecords = (model) => {
  return {
    readAllPopulated: async (args) => {
      if (args) {
        const data = args.map((model) => {
          return {
            association: model,
            attributes: { exclude: ["password"] },
          };
        });
        try {
          return await model.findAll({
            include: [...data],
          });
        } catch (e) {
          throw new Error(`Server Error`);
        }
      }
      try {
        return await model.findAll({
          include: {
            all: true,
            // nested: true,
            attributes: { exclude: ["password"] },
          },
          attributes: { exclude: ["password"] },
        });
      } catch (e) {
        throw new Error(e.message);
      }
    },
  };
};

const canUpdateInBulk = (model) => {
  return {
    updateInBulk: async (data, fields) => {
      try {
        return model.bulkCreate(data, {
          updateOnDuplicate: fields,
        });
      } catch (e) {
        throw new Error(e.message);
      }
    },
  };
};

const canIncrementValue = (model) => {
  return {
    incrementValue: async (id, data) => {
      return await model.increment(data, {
        where: { id },
      });
    },
  };
};

const createGenericCollections = (model) => {
  return {
    ...canReadAllRecords(model),
    ...canUpdateRecord(model),
    ...canDestroyRecord(model),
    ...canReadPopulatedRecords(model),
    ...canPopulateOneRecordById(model),
    ...canCreateOneRecord(model),
    ...canReadAllRecordsWithCondition(model),
    ...canDestroyEventCatRecord(model),
  };
};

const createTrackerCollection = (model) => {
  return {
    ...canCreateOneRecord(model),
    ...canCreateInBulk(model),
    ...canIncrementValue(model),
  };
};

const createAuthCollection = (model) => {
  return {
    ...canFindByEmailOrPhone(model),
    // ...canFindByPhone(model)
  };
};

const createOrderCollection = (model) => {
  return {
    ...canCreateWithNested(model),
    ...canReadAllRecords(model),
    ...canUpdateRecord(model),
    ...canDestroyRecord(model),
    ...canReadPopulatedRecords(model),
    ...canPopulateOneRecordById(model),
    ...canCreateOneRecord(model),
  };
};

const createOrderDetailsCollection = (model) => {
  return {
    ...canCreateInBulk(model),
  };
};

const createSaleItemCollection = (model) => {
  return {
    ...canReadAllRecords(model),
    ...canPopulateOneRecordById(model),
    ...canUpdateRecord(model),
    ...canDestroyRecord(model),
    ...canCreateOneRecord(model),
    ...canIncrementValue(model),
    ...canReadPopulatedRecords(model),
    ...canReadAllRecordsWithCondition(model)
  };
};

const createEventCollection = (model) => {
  return {
    ...canReadPopulatedRecords(model),
    ...canReadAllRecords(model),
    ...canCreateWithNested(model),
    ...canCreateOneRecord(model),
    ...canPopulateOneRecordById(model),
    ...canReadAllRecordsWithCondition(model),
    ...canDestroyRecord(model),
    ...canUpdateInBulk(model),
    ...canUpdateRecord(model),
    ...canDestroyEventCatRecord(model),
    ...canPopualteOneRecordWithNestedData(model),
    ...selectNestedItemsByEventandCatID(model)
  };
};

const createtestCollection = (model) => {
  return {
    ...canReadPopulatedRecords(model),
    ...canReadAllRecords(model),
    ...canCreateWithNested(model),
    ...canCreateOneRecord(model),
    ...canPopulateOneRecordById(model),
    ...canReadAllRecordsWithCondition(model),
    ...canDestroyRecord(model),
    ...canUpdateInBulk(model),
    ...canUpdateRecord(model),
  };
};

const createCategoryCollection = (model) => {
  return {
    ...canReadPopulatedRecords(model),
    ...canReadAllRecords(model),
    ...canCreateWithNested(model),
    ...canCreateOneRecord(model),
    ...canPopulateOneRecordById(model),
    ...canReadAllRecordsWithCondition(model),
    ...canDestroyRecord(model),
    ...canUpdateInBulk(model),
    ...canUpdateRecord(model),
    ...canDestroyEventCatRecord(model),
  };
};

module.exports = {
  createGenericCollections,
  createAuthCollection,
  createSaleItemCollection,
  createOrderDetailsCollection,
  createOrderCollection,
  createTrackerCollection,
  createEventCollection,
  createCategoryCollection,
  createtestCollection,
};
