const express = require('express')

// controller
const { sendUserPage, showUsers, deleteUser } = require('../controller/users_c')

//middleware
const vfyToken = require('../middleware/vfyToken')

const users = express.Router()

users.route('/').get(vfyToken, sendUserPage).post(vfyToken, showUsers).delete(vfyToken, deleteUser)


module.exports = users