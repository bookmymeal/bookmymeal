const mongoose = require('mongoose')

const vfyEmailSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  timestamp: {
    type: String,
    required: true,
  }
})

const vfyEmail = mongoose.model('vfyEmail', vfyEmailSchema)

module.exports = vfyEmail