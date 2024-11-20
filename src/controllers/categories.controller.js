const { dbInsertCategories, dbGetCategories, dbGetCategoriesById, dbDeleteCategories, dbUpdateCategories } = require ('../services/categories.service');

// Muestra todos los Categoriess registrados
async function getCategories( req, res ) {
    /** ! TODO: Obtener los productos paginados */
    try {
        const data = await dbGetCategories();

        res.status( 200 ).json({
            ok: true,
            data
        });    
    } 
    catch ( error ) {
        console.error( error );
        res.status( 500 ).json({
            ok: false,
            msg: 'Error al obtener todos los Categories'
        });
    }
}

async function getCategoriesById( req, res ) {
    const CategoriesId = req.params.id;

    try {
        const data = await dbGetCategoriesById( CategoriesId );

        /** Valida si el Categories NO fue encontrado */
        if( ! data ) {
            res.status( 404 ).json({
                ok: false,
                msg: 'Categories no encontrado'
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
            msg: 'Error al obtener un Categories por ID'
        })  
    }

}

async function createCategories( req, res ) {
    const payload = req.authUser;
    const inputData = req.body;
    console.log( inputData );       // Testing
    
    inputData.userId = payload.id;

    try {
        const data = await dbInsertCategories( inputData );
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
            msg: 'Error al crear un Categories'
        })
    }

}

function updateCategoriesPut( req, res ) {
    res.json({
        ok: true,
        msg: 'Actualiza todos los campos del Categories'
    });
}

async function updateCategoriesPatch( req, res ) {
    const CategoriesId = req.params.id;
    const inputData = req.body;

    try {
        const data = await dbUpdateCategories( CategoriesId, inputData );

        res.status( 200 ).json({
            ok: true,
            data
        });    
    } 
    catch ( error ) {
        console.error( error );
        res.status( 500 ).json({
            ok: false,
            msg: 'Error al actualizar un Categories por ID'
        })   
    }
}

async function deleteCategories( req, res ) {
    const CategoriesId = req.params.id;
    /** ! TODO: Validar cuando no encuentra un Categories y responder al usuario */

    try {
        const data = await dbDeleteCategories( CategoriesId );

        if( ! data ) {
            return res.status(404).json({
                ok: false,
                msg: 'Categoria no existe'
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
            msg: 'Error al eliminar un Categories por ID'
        })
    }

    
}

module.exports = {
    getCategories,
    getCategoriesById,
    createCategories,
    updateCategoriesPut,
    updateCategoriesPatch,
    deleteCategories
}