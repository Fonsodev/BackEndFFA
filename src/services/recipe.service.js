/** El Archivo de Servicio tiene la responsabilidad unica de hacer consultas a la base de datos */

const RecipeModel = require("../models/Recipe.model");

const dbGetRecipes = async () => {
    return await RecipeModel.find().populate('userId');
}

const dbGetRecipeById = async ( _id ) => {
    return await RecipeModel.findOne({ _id });
}

const dbInsertRecipe = async ( newRecipe ) => {
    return await RecipeModel.create( newRecipe );
}

const dbUpdateRecipe = async ( id, updatedRecipe ) => {
    return await RecipeModel.findOneAndUpdate(
        { _id: id },        // Objeto de consulta
        updatedRecipe,     // Objeto con las propiedades y valores a actualizar
        { new: true }       // Configurando la salida de la consulta
    );
}

const dbDeleteRecipe = async ( id ) => {
    return await RecipeModel.findByIdAndDelete( id );
}


module.exports = {
    dbGetRecipes,
    dbGetRecipeById,
    dbInsertRecipe,
    dbUpdateRecipe,
    dbDeleteRecipe
};