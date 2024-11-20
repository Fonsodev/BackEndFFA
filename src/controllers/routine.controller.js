const { dbInsertRoutine, dbUpdateRoutine, dbDeleteRoutine, dbGetRoutines, dbGetRoutineById } = require("../services/routine.service");

// Muestra todos los productos registrados
async function getRoutines(req, res) {
    /** ! TODO: Obtener los productos paginados */
    try{
        const data = await dbGetRoutines();

        res.status(200).json({
            ok: true,
            data
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener todas las rutinas'
        });
    }
}

async function getRoutineById (req, res) {
    const routineId = req.params.id;

    try{
        const data = await dbGetRoutineById(routineId);

        if(!data) {
            res.status(404).json({
                ok: false,
                msg: 'Rutina no encontrada'
            });
        }

        res.status(200).json({
            ok: true,
            data
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok:false,
            msg: 'Error al obtener una rutina por ID'
        })
    }
}

async function createRoutine( req, res ) {
    const payload = req.authUser;
    const inputData = req.body;
    console.log( inputData );       // Testing

    inputData.userId = payload.id;

    try {
        const data = await dbInsertRoutine( inputData );
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
            msg: 'Error al crear Rutina'
        })
    }

}

async function updatedRoutinePatch (req, res) {
    const routineId = req.params.id;
    const inputData =req.body;

    try{
        const data = await dbUpdateRoutine(routineId, inputData);

        res.status(200).json({
            ok: true,
            data
        })
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar una rutina por ID'
        })
    }
}

async function deleteRoutine (req, res) {
    const routineId = req.params.id;

    try{
        const data = await dbDeleteRoutine(routineId);

        res.status(200).json({
            ok:true,
            data
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok:false,
            msg: 'Error al eliminar una rutina por ID'
        });
    }
}

module.exports = {
    getRoutines,
    getRoutineById,
    createRoutine,
    updatedRoutinePatch,
    deleteRoutine
}