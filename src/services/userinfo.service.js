/** El Archivo de Servicio tiene la responsabilidad unica de hacer consultas a la base de datos */

const UserInfoModel = require("../models/UserInfo.model");



const dbGetUserInfo = async () => {
    return await UserInfoModel.find().populate('userId');
}

const dbGetUserInfoById = async ( _id ) => {
    return await UserInfoModel.findOne({ _id });
}
const dbGetUserinfoByUserId = async (userId) => {
    return await UserInfoModel.findOne({userId})
}
const dbInsertUserInfo = async ( newUserInfo ) => {
    return await UserInfoModel.create( newUserInfo );
}

const dbUpdateUserInfo = async ( id, updatedUserInfo ) => {
    return await UserInfoModel.findOneAndUpdate(
        { _id: id },        // Objeto de consulta
        updatedUserInfo,     // Objeto con las propiedades y valores a actualizar
        { new: true }       // Configurando la salida de la consulta
    );
}

const dbDeleteUserInfo = async ( id ) => {
    return await UserInfoModel.findByIdAndDelete( id );
}


module.exports = {
    dbGetUserInfo,
    dbGetUserInfoById,
    dbGetUserinfoByUserId,
    dbInsertUserInfo,
    dbUpdateUserInfo,
    dbDeleteUserInfo
};