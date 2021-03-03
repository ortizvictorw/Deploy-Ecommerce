const mongoose = require ('mongoose');
const {Schema} = mongoose;

const ProductoSchema = new Schema({
    titulo:
    {
    type:String
    },

    descripcion:
    {
        type:String
    },

    precio:{
        type:Number
    },
    imagen:{
        type:String
    }
})

module.exports = mongoose.model('Producto', ProductoSchema);
