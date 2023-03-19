const jwt = require('jsonwebtoken')
const jwtSecret = process.env.jwtSecret

const secretKey = jwtSecret

const genToken = (payload) => {
  return new Promise((resolve, reject) => {
    const token = jwt.sign(payload, secretKey, { algorithm: 'HS256' }, function(err, newToken) {
      if (err) {
        reject(err)
      } else {
        resolve(newToken)
      }
    })
  })
}




module.exports = genToken