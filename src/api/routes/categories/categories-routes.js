'use strict';

const { express } = require("../../../config")
const { isAuthorized } = require("../../controllers/auth-controllers/isAuthorized")
const { isUserVerefied } = require("../../controllers/auth-controllers/isUserVerefied")
const { createCategory, getCategorie, getCategorieDetalis, deleteCategorie,
updateCategorie, } = require("./categories-controller")




const categorieRoutes = express.Router()



categorieRoutes.get('/categorie', getCategorie)
categorieRoutes.get('/categorie/:id', getCategorieDetalis)
categorieRoutes.post('/categorie', isUserVerefied, createCategory)
categorieRoutes.put('/categorie/:id', isUserVerefied, isAuthorized, updateCategorie)
categorieRoutes.delete('/categorie/:id', isUserVerefied, isAuthorized, deleteCategorie)
 


module.exports = {
    categorieRoutes
}