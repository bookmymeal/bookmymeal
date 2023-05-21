require('dotenv').config()

const url = process.env.url
const path = require('path')
const mongoConnect = require('./db/mongoConnect')
const express = require('express');
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.jwtSecret
const cookie_parser = require("cookie-parser");
const ejs = require('ejs')
const webpush = require('web-push')

webpush.setVapidDetails(
  'mailto:kdkothari7@gmail.com',
  process.env.vapidPubKey,
  process.env.vapidPriKey
)


// for test route
const book = require('./db/schema/booking')



const app = express();

// set View engine
app.set("view engine", 'ejs')

// middleware

app.use(express.static(path.resolve(__dirname, "static")))
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cookie_parser());


// routes
const register = require('./routes/register.js')
const login = require('./routes/login.js')
const booking = require('./routes/booking.js')
const forgotPwd = require('./routes/forgotPwd.js')
const resetPwd = require('./routes/resetPwd')
const vfyEmail = require('./routes/vfyEmail')
const search = require('./routes/search')
const deleteMeal = require('./routes/deleteMeal')
const createAdmin = require('./routes/createAdmin')
const removeAdmin = require('./routes/removeAdmin')
const users = require('./routes/users')
const vfyAccount = require('./routes/vfyAccount')
const notification = require('./routes/notification')
const sendDailyEmailReport = require('./routes/cron_mail')
const dailyNotification = require('./routes/cron_notification')

app.use('/booking', booking)
app.use('/register', register)
app.use('/login', login)
app.use('/forgotPwd', forgotPwd)
app.use('/resetPwd', resetPwd)
app.use('/vfyEmail', vfyEmail)
app.use('/search', search)
app.use('/delete', deleteMeal)
app.use('/createAdmin', createAdmin)
app.use('/removeAdmin', removeAdmin)
app.use('/users', users)
app.use('/vfyAccount', vfyAccount)
app.use('/notification', notification)
app.use('/dailyEmailReport', sendDailyEmailReport)
app.use('/dailyNotification', dailyNotification)

mongoConnect(app)

app.get("/", (req, res) => {
  jwt.verify(req.cookies.session, jwtSecret, function(err, decoded) {
    if (err) {
      console.log("err", err.message)
      res.clearCookie("session"); // if cookie is tempared
      res.sendFile(path.resolve(__dirname, "static", "login.html"));
    }
    if (decoded) {
      res.render(path.resolve(__dirname, "static", "booking.ejs"), {name: {firstname: decoded.firstname}});
    }
  })
});

app.get("/logout", (req, res) => {
  console.log("/logout hit");
  res.clearCookie("session");
  res.redirect("/");
});

// cron job daily web-push notification
// const sendDailyNotification = require('./utils/cronJob')
// sendDailyNotification()


// testing path for any query value search in search field
app.get('/test', async (req, res) => {
  const { query } = req.query

  const pipe = [
    {
      '$search': {
        'index': 'search',
        'text': {
          'query': query,
          'path': {
            'wildcard': '*'
          }
        }
      }
    }
  ]
  const data = await book.aggregate(pipe)
  console.log("data", data)
  res.end()
})