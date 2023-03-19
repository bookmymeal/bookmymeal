const express = require('express')
const login = express.Router()
const log_in = require('../controller/login_c')

login.route('/').post(log_in)

module.exports = login