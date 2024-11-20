const {Schema,model} = require( 'mongoose' );


const CategorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required:true
    },

    userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
    },

},{
    timestamps:true
})

const CategoryModel = model('categories',CategorySchema)

module.exports = CategoryModel;