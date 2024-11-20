const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    ingredients: {
      type: [String],
      required: true,
    },

    instructions: {
      type: [String],
      required: true,
    },


    calories: {
        type: Number,
        required: true,
      },
    proteins: {
        type: Number,
        required: true,
      },
    fats: {
        type: Number,
        required: true,
      },
    carbohydrates: {
        type: Number,
        required: true,
     },
     fiber: {
      type: Number,
      required: true,
   },
    
      userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    }, 
  },{
    timestamps: true    // Agrega campos de fecha: creacion y actualizacion del documento
});
const RecipeModel = mongoose.model(
  "Recipe", // Nombre de la coleccion
  RecipeSchema // Estructura de datos de nuestro modelo
);

module.exports = RecipeModel;
