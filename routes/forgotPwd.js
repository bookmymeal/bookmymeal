const express = require('express')

const forgotPwd = express.Router()
const { sendForgotPwdPage, sendForgotPwdLink } = require('../controller/forgotPwd_c')

forgotPwd.route('/').get(sendForgotPwdPage).post(sendForgotPwdLink)

module.exports = forgotPwd