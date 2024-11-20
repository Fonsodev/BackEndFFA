/** El Archivo de Servicio tiene la responsabilidad unica de hacer consultas a la base de datos */

const CategoriesModel = require("../models/categories.model");

const dbGetCategories = async () => {
    return await CategoriesModel.find().populate('userId');
}

const dbGetCategoriesById = async ( _id ) => {
    return await CategoriesModel.findOne({ _id });
}

const dbInsertCategories = async ( newCategories ) => {
    return await CategoriesModel.create( newCategories );
}

const dbUpdateCategories = async ( id, updatedCategories ) => {
    return await CategoriesModel.findOneAndUpdate(
        { _id: id },        // Objeto de consulta
        updatedCategories,     // Objeto con las propiedades y valores a actualizar
        { new: true }       // Configurando la salida de la consulta
    );
}

const dbDeleteCategories = async ( id ) => {
    return await CategoriesModel.findByIdAndDelete( id );
}


module.exports = {
    dbGetCategories,
    dbGetCategoriesById,
    dbInsertCategories,
    dbUpdateCategories,
    dbDeleteCategories
};