const users = require('../db/schema/users')

const vfyAccountByAdmin = async (req, res) => {
  if(res.decodedToken.role === 'admin') {
    const result = await users.updateMany({ _id: { $in: req.body.ids } }, {$set: {'verifiedbyadmin': true}})
    res.json({ msg: 'data received' })
  }else{
    res.send("Not Authorized")
  } 
  
}

module.exports = vfyAccountByAdmin