// schema
const users = require('../db/schema/users')

// query
const findOne = require('../db/query/findOne')
const findOneAndUpdate = require('../db/query/findOneAndUpdate')


async function removeAdminRole(req, res) {
  const { id, pwd } = req.body

  try {
    const user = await findOne(users, { id: id })

    if (user) {
      if (user.role === 'user') {
        res.json({ msg: "You are not Admin" })
      } else {
        const update = await findOneAndUpdate(users, { id: id }, { role: "user" })
        if (update.role === 'user') {
          res.json({ msg: "Admin Role Removed Successfully" })
        } else {
          res.json({ err: 'Error occured' })
        }
      }
    } else {
      res.json({ err: 'No such user exist' })
    }

  } catch (err) {
    // console.log(err)
    res.json({ err: err.msg })
  }
}

module.exports = removeAdminRole