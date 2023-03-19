const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    
    salt: String,

    hash: String,

    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    verifiedbyadmin: {
        type: Boolean,
    },
    verifiedbyuser:{
        type: Boolean
    },
    joined: {
        type: String,
    },
    role: {
      type: String,
      default: "user"
    }
   
})

const users = new mongoose.model('users', userSchema)

module.exports = users
