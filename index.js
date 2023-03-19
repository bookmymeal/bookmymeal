require('dotenv').config

const url = process.env['url']
const path = require('path')
const mongoConnect = require('./db/mongoConnect')
const express = require('express');
const jwt = require('jsonwebtoken')
const jwtSecret = process.env['jwtSecret']
const cookie_parser = require("cookie-parser");


// for test route
const book = require('./db/schema/booking')

// for testing /vfyAccount
const use = require('./db/schema/users')

const app = express();

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


app.get("/", (req, res) => {
  jwt.verify(req.cookies.session, jwtSecret, function(err, decoded) {
    if (err) {
      console.log("err", err.message)
      res.clearCookie("session"); // if cookie is tempared
      res.sendFile(path.resolve(__dirname, "static", "login.html"));
    }
    if (decoded) {
      res.sendFile(path.resolve(__dirname, "static", "booking.html"));
    }
  })
});

app.get("/logout", (req, res) => {
  console.log("/logout hit");
  res.clearCookie("session");
  res.redirect("/");
});


app.listen(3000, () => {
  console.log('server started');
  mongoConnect()
});


// testing user page

app.post('/vfyAccount', async (req, res) => {
  const result = await use.updateMany({ _id: { $in: req.body.ids } }, {$set: {'verifiedbyadmin': true}})
  console.log('Account verfied', result)
  res.json({ msg: 'data received' })
  console.log('/vfyAccount', req.body)
})



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