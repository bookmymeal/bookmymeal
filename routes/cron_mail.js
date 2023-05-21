const express = require('express')
const dailyEmailReport = require('../controller/dailyEmailReport')


const cron_mail = express.Router()

cron_mail.route('/').get(dailyEmailReport)

module.exports = cron_mail