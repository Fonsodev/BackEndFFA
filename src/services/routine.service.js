const RoutineModel = require("../models/Routine.model");

const dbGetRoutines = async () => {
    return await RoutineModel.find().populate('userId');
}

const dbGetRoutineById = async ( _id ) => {
    return await RoutineModel.findOne({ _id });
}

const dbInsertRoutine = async ( newRoutine ) => {
    return await RoutineModel.create( newRoutine );
}

const dbUpdateRoutine = async ( id, updatedRoutine ) => {
    return await RoutineModel.findOneAndUpdate(
        { _id: id },        // Objeto de consulta
        updatedRoutine,     // Objeto con las propiedades y valores a actualizar
        { new: true }       // Configurando la salida de la consulta
    );
}

const dbDeleteRoutine = async ( id ) => {
    return await RoutineModel.findByIdAndDelete( id );
}

module.exports = {
    dbGetRoutines,
    dbGetRoutineById,
    dbInsertRoutine,
    dbUpdateRoutine,
    dbDeleteRoutine
}