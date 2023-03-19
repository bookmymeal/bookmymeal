const path = require('path')

// schema
const users = require('../db/schema/users')

// query
const findOne = require('../db/query/findOne')
const findOneAndUpdate = require('../db/query/findOneAndUpdate')


async function createAdminRole(req, res) {
  const { id, pwd } = req.body

  try {
    const user = await findOne(users, { id: id })
    console.log(user)
    if (user) {
      if (user.role === 'admin') {
        res.json({ msg: "You are alrady Admin" })
      } else {
        const update = await findOneAndUpdate(users, { id: id }, { role: "admin" })
        if (update.role === 'admin') {
          res.json({ msg: "Admin Role Created Successfully" })
        } else {
          res.json({ err: 'Error occured' })
        }
      }
    } else {
      res.json({ err: 'No such user exist' })
    }

  } catch (err) {
    res.json({ err: err.msg })
  }
}

const sendCreateAdminPage = (req, res) => {
  res.sendFile(path.resolve(__dirname, "../static", 'admin.html' ))
}

module.exports = {createAdminRole, sendCreateAdminPage}