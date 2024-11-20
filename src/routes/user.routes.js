const express = require( 'express' );
const { authUser } = require('../middlewares/auth-user.middleware');
const { createuser, getUser, updateUser, deleteUser, getUserById } = require('../controllers/user.controller');
const router = express.Router();

/**Definir las rutas para la entidad usuario 
 * http://localhost:3000/api/auth
*/

// Crear un usuario --> http://localhost:3000/api/user
router.post( '/', createuser );
router.get('/', getUser);
router.get('/:id', getUserById);
router.patch('/:id', authUser, updateUser);
router.delete('/:id', authUser, deleteUser);


module.exports = router;