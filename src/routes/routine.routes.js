const express = require( 'express' );
const router = express.Router();

const { getRoutines, createRoutine, updatedRoutinePatch, deleteRoutine, getRoutineById } = require('../controllers/routine.controller');
const { authUser } = require('../middlewares/auth-user.middleware');

/** Definir las rutas para la entidad producto
 * http://localhost:3000/api/routine
*/

router.post( '/', authUser,createRoutine );           // Crear un producto

router.get( '/', getRoutines );                         // Obtiene todos los productos
router.get( '/:id', getRoutineById );                   // Obtiene un producto por su ID                            

// // router.put( '/', authUser, updateProductPut );        // Actualiza todos los campos de un producto
router.patch( '/:id', authUser, updatedRoutinePatch );    // Actualiza parcialmente los campos de un producto
router.delete( '/:id', authUser, deleteRoutine );        // Elimina un producto

module.exports = router;