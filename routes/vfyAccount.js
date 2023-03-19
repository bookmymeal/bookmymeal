const express = require('express')

const vfyAccount = express.Router()

// middeleware
const vfyToken = require('../middleware/vfyToken')

// controller
const vfyAccountByAdmin = require('../controller/vfyAccount_c')

vfyAccount.route('/').post(vfyToken, vfyAccountByAdmin)

module.exports = vfyAccount