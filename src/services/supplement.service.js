/** El Archivo de Servicio tiene la responsabilidad unica de hacer consultas a la base de datos */

const SupplementModel = require("../models/supplement.model");

const dbGetSupplements = async () => {
    return await SupplementModel.find().populate('userId');
}

const dbGetSupplementById = async ( _id ) => {
    return await SupplementModel.findOne({ _id });
}

const dbInsertSupplement = async ( newSupplement ) => {
    return await SupplementModel.create( newSupplement );
}

const dbUpdateSupplement = async ( id, updatedSupplement ) => {
    return await SupplementModel.findByIdAndUpdate(
        id,        // Objeto de consulta
        updatedSupplement,     // Objeto con las propiedades y valores a actualizar
        { new: true }       // Configurando la salida de la consulta
    );
}

const dbDeleteSupplement = async ( id ) => {
    return await SupplementModel.findByIdAndDelete( id );
}


module.exports = {
    dbGetSupplements,
    dbGetSupplementById,
    dbInsertSupplement,
    dbUpdateSupplement,
    dbDeleteSupplement
};