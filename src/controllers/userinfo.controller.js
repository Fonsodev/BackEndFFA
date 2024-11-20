
const { dbInsertUserInfo, dbGetUserInfo, dbUpdateUserInfo, dbDeleteUserInfo } = require('../services/userinfo.service');
async function getUserInfo(req,res) {
    try {
        const data = await dbGetUserInfo();

        res.status( 200 ).json({
            ok: true,
            data
        });    
    } 
    catch ( error ) {
        console.error( error );
        res.status( 500 ).json({
            ok: false,
            msg: 'Error al obtner la lista de toda la informacion de los usuarios'
        });
    }
}

async function createuserinfo( req, res ) {

    const inputData = req.body;
    console.log( inputData );       // Testing


    try {
        const data = await dbInsertUserInfo( inputData );
        console.log( data );            // Testing
        res.status( 201 ).json({
            ok: true,
            data           // ECMAScript data: data ---> data
        });        
    } 
    catch ( error ) {
        console.error( error );
        res.status( 500 ).json({
            ok: false,
            msg: 'Error al crear la informacion del usuario'
        })
    }

}

async function updateUserInfo( req, res ) {
    const UserInfotId = req.params.id;
    const inputData = req.body;

    try {
        const data = await dbUpdateUserInfo( UserInfotId, inputData );

        res.status( 200 ).json({
            ok: true,
            data
        });    
    } 
    catch ( error ) {
        console.error( error );
        res.status( 500 ).json({
            ok: false,
            msg: 'Error al actualizar usuario'
        })   
    }
}

async function deleteUserInfo( req, res ) {
    const productId = req.params.id;
    /** ! TODO: Validar cuando no encuentra un producto y responder al usuario */

    try {
        const data = await dbDeleteUserInfo( productId );

        res.status( 200 ).json({
            ok: true,
            data
        });    
    } 
    catch ( error ) {
        console.error( error );
        res.status( 500 ).json({
            ok: false,
            msg: 'Error al eliminar un producto por ID'
        })
    }

    
}


module.exports = {createuserinfo, getUserInfo, updateUserInfo, deleteUserInfo};