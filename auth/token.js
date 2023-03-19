const jwt = require('jsonwebtoken')
const jwtSecret = process.env.jwtSecret


const genToken = (payload) => {
  return new Promise((resolve, reject) => {
    const token = jwt.sign(payload, jwtSecret, { algorithm: 'HS256' }, function(err, newToken) {
      if (err) {
        reject(err)
      } else {
        resolve(newToken)
      }
    })
  })
}




module.exports = genToken