const express = require('express')

const booking = express.Router()

//middleware
const vfyToken = require('../middleware/vfyToken')

//controller
const {sendBookingPage, saveBooking} = require('../controller/booking_c')



booking.route('/').get(vfyToken, sendBookingPage).post(vfyToken, saveBooking)

module.exports = booking