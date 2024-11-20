const express = require( 'express' );
const router = express.Router();

const { getSupplement, createSupplement, updateSupplementPatch, deleteSupplement, getSupplementById, getSupplements, updatedSupplementPatch } = require('../controllers/supplement.controller');
const { Supplement, greeting, authUser } = require('../middlewares/auth-user.middleware');

/** Definir las rutas para la entidad producto
 * http://localhost:3000/api/Supplements
*/

router.post( '/', authUser,createSupplement );           // Crear un producto

router.get( '/', getSupplements );                         // Obtiene todos los productos
router.get( '/:id', getSupplementById );                   // Obtiene un producto por su ID                            

// // router.put( '/', authUser, updateProductPut );        // Actualiza todos los campos de un producto
router.patch( '/:id', authUser, updatedSupplementPatch );    // Actualiza parcialmente los campos de un producto
router.delete( '/:id', authUser, deleteSupplement );        // Elimina un producto


module.exports = router;