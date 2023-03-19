const jwt = require('jsonwebtoken')
const jwtSecret = process.env.jwtSecret


const genExpiringToken = (payload, expiry) => {
  return new Promise((resolve, reject) => {
    const token = jwt.sign(payload, jwtSecret, { algorithm: 'HS256', expiresIn: 60 * expiry }, function(err, newToken) {
      if (err) {
        reject(err)
      } else {
        resolve(newToken)
      }
    })
  })
}




module.exports = genExpiringToken