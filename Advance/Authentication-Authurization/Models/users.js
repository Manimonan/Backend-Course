const mongoose = require("mongoose")
const userSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type: String,
        required:true,
    },
    userType:{
        type: String,
        enum:['user','host'],
        default:'user',
    },
    favourites:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Home',
    }]
})
module.exports = mongoose.model('User',userSchema)