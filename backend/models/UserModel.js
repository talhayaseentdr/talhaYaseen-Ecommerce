const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const userSchema = new Schema( {
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type:String,
        required:true
    },
    address: {
        type:String,
        required:true
    },
    phonenumber: {
        type:Number,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },


},{timestamps: true})





const User = mongoose.model('User', userSchema);

module.exports = { User};