const express = require('express')
const {createAdminRole, sendCreateAdminPage} = require('../controller/createAdmin_c')

// middleware
const vfyAdminPwd = require('../middleware/vfyAdminPwd')

const createAdmin = express.Router()

createAdmin.route('/').post(vfyAdminPwd, createAdminRole).get(sendCreateAdminPage)


module.exports = createAdmin