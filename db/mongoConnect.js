const mongoose = require('mongoose')
const url = process.env['url']

const mongoConnect = function mongoConnect() {
  return (
    mongoose.connect(url)
      .then(() => console.log('connected to database'))
      .catch(err => console.log(err.message))
  )
}

module.exports = mongoConnect

