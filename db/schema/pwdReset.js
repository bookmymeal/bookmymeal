const mongoose = require('mongoose')

const pwdResetSchema = new mongoose.Schema({
  id: String,
  token: String,
})

const pwdReset = mongoose.model('pwdReset', pwdResetSchema)

module.exports = pwdReset