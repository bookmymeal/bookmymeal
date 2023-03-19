const express = require('express')

const resetPwd = express.Router()

// controller
const {sendResetPwdPage, resetPwdLink} = require('../controller/resetPwd_c')

resetPwd.route('/').get(sendResetPwdPage).post(resetPwdLink)

module.exports = resetPwd