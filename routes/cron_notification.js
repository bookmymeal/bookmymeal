const express = require('express')
const notification = require('../controller/dailyNotification')

const dailyNotification = express.Router()

dailyNotification.route('/').get(notification)

module.exports = dailyNotification