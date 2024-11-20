const { Schema, model } = require( 'mongoose' );

/** Define el esquema o la estructura de datos que necesita Mongoose para crear sus objetos o documentos */
const RoutineSchema = new Schema({
    /** Defino los campos que tiene la estructura */
    urlImage: {
        type: String,
    
    },    
    name: {                 // Nombre de la propiedad
        type: String,       // Define tipo          (regla 1)
        required: true
    },
    repetitionsStrength: {
        type: Number,
        default: 12,
        min: 10
    },
    averageSetsStrength: {
        type: Number,
        default: 4,
        min: 2
    },
    repetitionsEndurance: {
        type: Number,
        default: 18,
        min: 15
    },
    averageSetsEndurance: {
        type: Number,
        default: 4,
        min: 2
    },
    repetitionsHypertrophy: {
        type: Number,
        default: 8,
        min: 6
    },
    averageSetstHypertrophy: {
        type: Number,
        default: 4,
        min: 2
    },
    description: {
        type: String,
        required: true
    },
    muscleGroup: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
}, {
    timestamps: true        // Agrega campos de fecha: creacion y actualizacion del documento
});

/** Establecemos un vínculo entre la estructura de datos y nombre que deseamos darle a coleccion en la base de datos */
const RoutineModel = model( 
    'routines',     // Nombre de la coleccion donde se van a guardar los documentos de tipo Product
    RoutineSchema
);

module.exports = RoutineModel;      // Exportamos el modelo
