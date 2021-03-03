const mongoose = require ('mongoose');
const {Schema} = mongoose;


const Role = new Schema({
        nombre:
        {
            type:String
        },
        versionKey:false
})




module.exports = mongoose.model('Role', Role);
