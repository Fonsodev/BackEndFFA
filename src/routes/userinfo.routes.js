const express = require( 'express' );
const {createuserinfo, getUserInfo, updateUserInfo, deleteUserInfo} = require('../controllers/userinfo.controller');
const { authUser } = require('../middlewares/auth-user.middleware');
const router = express.Router();

/**Definir las rutas para la entidad usuario 
 * http://localhost:3000/api/auth
*/

// Crear un usuario --> http://localhost:3000/api/auth/register
router.post( '/', createuserinfo );
router.get('/', getUserInfo);
router.patch('/:id', authUser,updateUserInfo);
router.delete('/:id', authUser,deleteUserInfo);


module.exports = router;