const express = require( 'express' );
const router = express.Router();

const { getRecipes, createRecipe, updateRecipePatch, deleteRecipe, getRecipeById } = require('../controllers/Recipe.controller');
const { authUser } = require('../middlewares/auth-user.middleware');

/** Definir las rutas para la entidad producto
 * http://localhost:3000/api/recipes
*/

router.post( '/', authUser,createRecipe );           // Crear un producto

router.get( '/', getRecipes );                         // Obtiene todos los productos
router.get( '/:id', getRecipeById );                   // Obtiene un producto por su ID                            

// // router.put( '/', authUser, updateProductPut );        // Actualiza todos los campos de un producto
router.patch( '/:id', authUser, updateRecipePatch );    // Actualiza parcialmente los campos de un producto
router.delete( '/:id', authUser, deleteRecipe );        // Elimina un producto

module.exports = router;