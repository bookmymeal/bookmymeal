const jwt = require('jsonwebtoken')
const jwtSecret = process.env.jwtSecret

const vfyToken = (req, res, next) => {

  if (req.cookies) {
    jwt.verify(req.cookies.session, jwtSecret, function(err, decoded) {
      if (err) {
        console.log("token vfy err", err)
        // res.json({msg: "You are not authorized to access this resource"})
        res.clearCookie("session"); // if cookie is tempared
        res.redirect("/") // if jwt not verfifyed
        return
      }
      if (decoded) {
        res.decodedToken = decoded
        console.log("decoded token", decoded)
        next()
      }

    })
  } else {
    console.log("cookie : ", req.cookies)
    res.send("Log In to visit this page!")
  }

}

module.exports = vfyToken