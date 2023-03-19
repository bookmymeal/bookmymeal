const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({

    id: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    meal: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    for: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    comment: String,
  
    firstname: {
        type: String,
        required: true
    },
    lastname: {
      type: String,
      required: true
    }

})

const booking = new mongoose.model('booking', bookingSchema)

module.exports = booking