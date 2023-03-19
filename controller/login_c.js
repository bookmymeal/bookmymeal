const bc = require('bcryptjs')

// schema
const users = require('../db/schema/users')

// query
const findOne = require('../db/query/findOne')

// auth
const genToken = require('../auth/token')
const { vfyHash } = require('../auth/hash')


async function login(req, res) {
  const { id, password } = req.body
  const user = await findOne(users, { id })
  if (user) {
    const { firstname, lastname, role } = user
    if (user.verifiedbyuser && user.verifiedbyadmin) {

      const hash = await vfyHash(password, user.hash)
      console.log('isHashTrue', hash)

      if (hash) {
        res.header({ "Set-Cookie": `session=${await genToken({ id, firstname, lastname, role })}` })
        res.json({ redirect: "/booking" });
      } else {
        res.json({ passErr: "Password Do Not Match" })
      }
    } else if (!user.verifiedbyuser) {
      res.json({ verified: "Email not verified" })  
    }
    else {
        res.json({ verified: "Not verified by admin" })
    }
  } else {
    res.json({ userErr: "No Such User Found" })
  }
}

module.exports = login


