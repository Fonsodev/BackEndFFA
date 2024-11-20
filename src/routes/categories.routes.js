const express = require( 'express' );
const router = express.Router();

const { getCategories, createCategories, updateCategoriesPatch, deleteCategories, getCategoriesById } = require('../controllers/categories.controller');
const { categories, greeting, authUser } = require('../middlewares/auth-user.middleware');

/** Definir las rutas para la entidad producto
 * http://localhost:3000/api/categories
*/

router.post( '/', authUser,createCategories);           // Crear un producto

router.get( '/', getCategories );                         // Obtiene todos los productos
router.get( '/:id', getCategoriesById );                   // Obtiene un producto por su ID                            

// // router.put( '/', authUser, updateProductPut );        // Actualiza todos los campos de un producto
router.patch( '/:id', authUser, updateCategoriesPatch );    // Actualiza parcialmente los campos de un producto
router.delete( '/:id', authUser, deleteCategories );        // Elimina un producto



module.exports = router;