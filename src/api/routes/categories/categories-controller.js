'use strict';

const { categoriesCollection } = require('../../../models');
const { AppError } = require('../../controllers/errorControllers');

const createCategory = async (req, res, next) => {
  try {
    const newCategory = req.body;
    const createdCategory = await categoriesCollection.create(newCategory);
    res.status(201).json(createdCategory);
  } catch (e) {
    next(new AppError(401, 'Cannot Create Categorie'));
  }
};

const getCategorie = async (req, res, next) => {
  try {
    const categorieData = await categoriesCollection.readAllRecords()
    res.status(200).json(categorieData)
  } catch (error) {
    next(new AppError(500, 'Server Error'))
  }
}


const getCategorieDetalis = async (req, res, next) => {
  try {
    const { id } = req.params
    const categorieDetails = await categoriesCollection.populateById(id)
    res.status(200).json(categorieDetails)
  } catch (error) {
    next(new AppError(500, 'Server Error'))
  }
}


const deleteCategorie = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleteCategorie = await categoriesCollection.destroy(id);
    res.status(204).json(deleteCategorie);
  } catch (e) {
    next(new AppError(401, 'Cannot Delete Categorie'));
  }
};

const updateCategorie = async (req, res, next) => {
  try {
    const newCategorie = req.body;
    const { id } = req.params;
    const updatedCategorie = await categoriesCollection.update(id, newCategorie);
    res.status(201).json(updatedCategorie);
  } catch (e) {
    next(new AppError(401, 'Cannot Update Categorie'));
  }
};

module.exports = {
    createCategory,
    getCategorie,
    getCategorieDetalis,
    deleteCategorie,
    updateCategorie,
};
