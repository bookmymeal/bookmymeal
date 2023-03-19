const path = require('path')

// schema

const users = require('../db/schema/users')

const sendUserPage = (req, res) => {
  if (res.decodedToken.role === 'admin') {
    res.sendFile(path.resolve(__dirname, '../static', 'users.html'))
  } else {
    res.send('You are not authorized')
  }
}

const showUsers = async (req, res) => {
  const { user } = req.body
  console.log('USER', user)
  let query;
  if (req.body.user) {
    query = {
      $or: [
        // { id: req.body.user }, casting error occures as users schema has id value set to number --> need to be solved $regex need to be added not workd when tried
        { firstname: user },
        { lastname: user }
      ]
    }
  } else {
    query = {}
  }
  // const json = JSON.stringify(query)
  // console.log('QUERY', JSON.parse(json))
  const data = await users.find(query).select({ 'id': 1, 'firstname': 1, 'lastname': 1, 'role': 1, 'joined': 1, 'verifiedbyadmin': 1 })
  // console.log("DATA", data)
  res.json(data)
}

const deleteUser = async (req, res) => {
  const result = await users.deleteMany({ _id: { $in: req.body.ids } })
  console.log('DELETED', result)
  res.json({ msg: 'data received' })
  console.log('/delete', req.body)
}

module.exports = { sendUserPage, showUsers, deleteUser }