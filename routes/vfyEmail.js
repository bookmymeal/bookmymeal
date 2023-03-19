const express = require('express')

const vfyEmail = express.Router()

const confirmEmail = require('../controller/vfyEmail_c.js')


vfyEmail.route('/').get(confirmEmail)

module.exports = vfyEmail