/** El Archivo de Servicio tiene la responsabilidad unica de hacer consultas a la base de datos */

const UserInfoModel = require("../models/User.model");



const dbGetUser = async () => {
    return await UserInfoModel.find().populate('userId');
}

const dbGetUserById = async ( _id ) => {
    return await UserInfoModel.findOne({ _id });
}

const dbInsertUser = async ( newUser ) => {
    return await UserInfoModel.create( newUser );
}

const dbUpdateUser = async ( id, updatedUser ) => {
    return await UserInfoModel.findOneAndUpdate(
        { _id: id },        // Objeto de consulta
        updatedUser,     // Objeto con las propiedades y valores a actualizar
        { new: true }       // Configurando la salida de la consulta
    );
}

const dbDeleteUser = async ( id ) => {
    return await UserInfoModel.findByIdAndDelete( id );
}


module.exports = {
    dbGetUser,
    dbGetUserById,
    dbInsertUser,
    dbUpdateUser,
    dbDeleteUser
};