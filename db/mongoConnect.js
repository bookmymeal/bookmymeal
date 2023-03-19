require('dotenv').config()
const mongoose = require('mongoose')
const url = process.env.url

const mongoConnect = function mongoConnect(app) {
  return (
    mongoose.connect(url, { useNewUrlParser: true })
      .then(() => {
        console.log('connected to database')
        app.listen(3000, () => {
          console.log('server started');
        });
      })
      .catch(err => console.log(err.message))
  )
}

module.exports = mongoConnect

