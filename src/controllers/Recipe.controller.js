const { dbInsertRecipe, dbGetRecipes, dbGetRecipeById, dbDeleteRecipe, dbUpdateRecipe } = require ('../services/recipe.service');


// Muestra todos los Recipes registrados
async function getRecipes( req, res ) {
    /** ! TODO: Obtener los productos paginados */
    try {
        const data = await dbGetRecipes();

        res.status( 200 ).json({
            ok: true,
            data
        });    
    } 
    catch ( error ) {
        console.error( error );
        res.status( 500 ).json({
            ok: false,
            msg: 'Error al obtener todos los Recipes'
        });
    }
}

async function getRecipeById( req, res ) {
    const RecipeId = req.params.id;

    try {
        const data = await dbGetRecipeById( RecipeId );

        /** Valida si el Recipe NO fue encontrado */
        if( ! data ) {
            res.status( 404 ).json({
                ok: false,
                msg: 'Recipe no encontrado'
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
            msg: 'Error al obtener un Recipe por ID'
        })  
    }

}

async function createRecipe( req, res ) {
    const payload = req.authUser;
    const inputData = req.body;
    console.log( inputData );       // Testing
    
    inputData.userId = payload.id;

    try {
        const data = await dbInsertRecipe( inputData );
        console.log( data );            // Testing
        data
        res.status( 201 ).json({
            ok: true,
            data           // ECMAScript data: data ---> data
        });        
    } 
    catch ( error ) {
        console.error( error );
        res.status( 500 ).json({
            ok: false,
            msg: 'Error al crear un Recipe'
        })
    }

}

function updateRecipePut( req, res ) {
    res.json({
        ok: true,
        msg: 'Actualiza todos los campos del Recipe'
    });
}

async function updateRecipePatch( req, res ) {
    const RecipeId = req.params.id;
    const inputData = req.body;

    try {
        const data = await dbUpdateRecipe( RecipeId, inputData );

        res.status( 200 ).json({
            ok: true,
            data
        });    
    } 
    catch ( error ) {
        console.error( error );
        res.status( 500 ).json({
            ok: false,
            msg: 'Error al actualizar un Recipe por ID'
        })   
    }
}

async function deleteRecipe( req, res ) {
    const RecipeId = req.params.id;
    /** ! TODO: Validar cuando no encuentra un Recipe y responder al usuario */

    try {
        const data = await dbDeleteRecipe( RecipeId );

        res.status( 200 ).json({
            ok: true,
            data
        });    
    } 
    catch ( error ) {
        console.error( error );
        res.status( 500 ).json({
            ok: false,
            msg: 'Error al eliminar un Recipe por ID'
        })
    }

    
}

module.exports = {
    getRecipes,
    getRecipeById,
    createRecipe,
    updateRecipePut,
    updateRecipePatch,
    deleteRecipe
}