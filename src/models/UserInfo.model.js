const mongoose = require( 'mongoose' );

const UserInfoSchema = new mongoose.Schema({
    age: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
}, {
    timestamps: true    // Agrega campos de fecha: creacion y actualizacion del documento
});


const UserInfoModel = mongoose.model(
    'UserInfo',             // Nombre de la coleccion
    UserInfoSchema          // Estructura de datos de nuestro modelo
); 

module.exports = UserInfoModel;