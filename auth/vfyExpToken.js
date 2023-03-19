const jwt = require('jsonwebtoken')
const jwtSecret = process.env.jwtSecret

const vfyExpToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, jwtSecret, function(err, decoded) {
      if (err) {
        reject(err)
      } else {
        resolve(decoded)
      }
    })
  })
}



module.exports = vfyExpToken