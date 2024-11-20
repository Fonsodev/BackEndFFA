const { Schema, model } = require( 'mongoose' );

/** Define el esquema o la estructura de datos que necesita Mongoose para crear sus objetos o documentos */
const SupplementSchema = new Schema({
    /** Defino los campos que tiene la estructura */
    urlImage: {
        type: String
    },
    name: {                 // Nombre de la propiedad
        type: String,       // Define tipo          (regla 1)
        required: true
    }, 
    description: String,   /** Equivale a --> description: { type: String } */
    quantity: {
        type: Number,
        default: 1,
        min: 1
    },
    price: {                // Nombre de la propiedad
        type: Number,       // Define tipo          (regla 1)
        default: 0,         // Valor por defecto    (regla 2)
        min: 0              // Valor minimo         (regla 3)
    },

    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
}, {
    timestamps: true        // Agrega campos de fecha: creacion y actualizacion del documento
});

/** Establecemos un vínculo entre la estructura de datos y nombre que deseamos darle a coleccion en la base de datos */
const SupplementModel = model( 
    'Supplements',     // Nombre de la coleccion donde se van a guardar los documentos de tipo Supplement
    SupplementSchema
);


module.exports = SupplementModel;      // Exportamos el modelo