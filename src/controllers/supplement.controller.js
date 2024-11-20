const { dbInsertSupplement, dbGetSupplements, dbGetSupplementById, dbDeleteSupplement, dbUpdateSupplement } = require('../services/supplement.service');


// Muestra todos los suplementos registrados
async function getSupplements( req, res ) {
    /** ! TODO: Obtener los suplementos paginados */
    try {
        const data = await dbGetSupplements();

        res.status( 200 ).json({
            ok: true,
            data
        });    
    } 
    catch ( error ) {
        console.error( error );
        res.status( 500 ).json({
            ok: false,
            msg: 'Error al obtener todos los suplementos'
        });
    }
}

async function getSupplementById( req, res ) {
    const SupplementId = req.params.id;

    try {
        const data = await dbGetSupplementById( SupplementId );

        /** Valida si el Supplemento NO fue encontrado */
        if( ! data ) {
            res.status( 404 ).json({
                ok: false,
                msg: 'Supplemento no encontrado'
            });
        } 

        res.status( 200 ).json({
            ok: true,
            data
        });
    } 
    catch ( error ) {
        console.error( error );
        res.status( 500 ).json({
            ok: false,
            msg: 'Error al obtener un Supplemento por ID'
        })  
    }

}

async function createSupplement( req, res ) {
    const payload = req.authUser;
    const inputData = req.body;
    console.log( inputData );       // Testing

    inputData.userId = payload.id;

    try {
        const data = await dbInsertSupplement( inputData );
        console.log( data );            // Testing
    
        res.status( 201 ).json({
            ok: true,
            hola: 'que mas',
            data: { hola: 'hoasas'}           // ECMAScript data: data ---> data
        });        
    } 
    catch ( error ) {
        console.error( error );
        res.status( 500 ).json({
            ok: false,
            msg: 'Error al crear un Supplemento'
        })
    }

}

function updateSupplementPut( req, res ) {
    res.json({
        ok: true,
        msg: 'Actualiza todos los campos del Supplemento'
    });
}

async function updatedSupplementPatch( req, res ) {
    const SupplementId = req.params.id;
    const inputData = req.body;

    try {
        const data = await dbUpdateSupplement( SupplementId, inputData );

        res.status( 200 ).json({
            ok: true,
            data
        });    
    } 
    catch ( error ) {
        console.error( error );
        res.status( 500 ).json({
            ok: false,
            msg: 'Error al actualizar un Supplemento por ID'
        })   
    }
}

async function deleteSupplement( req, res ) {
    const SupplementId = req.params.id;
    /** ! TODO: Validar cuando no encuentra un Suplemento y responder al usuario */

    try {
        const data = await dbDeleteSupplement( SupplementId );

        res.status( 200 ).json({
            ok: true,
            data
        });    
    } 
    catch ( error ) {
        console.error( error );
        res.status( 500 ).json({
            ok: false,
            msg: 'Error al eliminar un suplemento por ID'
        })
    }

    
}

module.exports = {
    getSupplements,
    getSupplementById,
    createSupplement,
    updateSupplementPut,
    updatedSupplementPatch,
    deleteSupplement
}