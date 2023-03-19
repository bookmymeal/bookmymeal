const express = require('express')
const removeAdminRole = require('../controller/removeAdmin_c')

// middleware
const vfyAdminPwd = require('../middleware/vfyAdminPwd')

const removeAdmin = express.Router()

removeAdmin.route('/').post(vfyAdminPwd, removeAdminRole)


module.exports = removeAdmin