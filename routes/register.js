const express = require('express')
const { registerUser, registrationForm } = require('../controller/register_c')

const register = express.Router()

register.route('/')
  .get(registrationForm)
  .post(registerUser)

module.exports = register