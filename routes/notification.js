const express = require('express')

const notification = express.Router()

// import controller function

const {sendNotificationPage, subscribe, sendNotification} = require('../controller/notification_c')

// middleware
const vfyToken = require('../middleware/vfyToken')

notification.route('/').get(vfyToken,sendNotificationPage)
notification.route('/subscribe').post(vfyToken, subscribe)
notification.route('/sendNotification').get(vfyToken, sendNotification)

module.exports = notification