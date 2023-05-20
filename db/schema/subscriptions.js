const mongoose = require('mongoose')

const subscriptionSchema = new mongoose.Schema({
  endpoint: {
    type: String,
    required: true,
    unique: true
  },
  expirationTime: {
    type: String,
    // required: true
  },
  keys: {
    p256dh:{
      type: String,
      required: true
    },
    auth:{
      type: String,
      required: true
    }
  }
})

const subscriptions = new mongoose.model("subscriptions", subscriptionSchema)

module.exports = subscriptions