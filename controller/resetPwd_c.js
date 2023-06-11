const path = require('path')
const vfyExpToken = require('../auth/vfyExpToken')
const {genSalt, genHash} = require('../auth/hash')

const findOneAndUpdate = require('../db/query/findOneAndUpdate')
const findOneAndDelete = require('../db/query/findOneAndDelete')
const findOne = require('../db/query/findOne')

const users = require('../db/schema/users')
const pwdReset = require('../db/schema/pwdReset')

async function sendResetPwdPage(req, res) {

  const { token } = req.query
  
  console.log("TOKEN: ", token)

  if (token) {
    try {
      const decoded = await vfyExpToken(token)
      console.log(decoded)
      res.sendFile(path.resolve(__dirname, '../static', "resetPwd.html"))

    } catch (err) {
      if (err.message === "jwt expired") {
        // console.log("from err", token)
        const deleted = await findOneAndDelete(pwdReset, {token: token})
        res.json({ data: "link expired" });
      }else {
         console.log('err', err.message);
         res.json({ err: err.message })
      }
    }
  } else {
    res.json({ data: "Not Authorized" })
  }
}



async function resetPwdLink(req, res) {
  console.log('/post on resetPwd')
  const { token } = req.query
  const { password } = req.body

  console.log("TOKEN: ", token)

  if (token) {
    try {
      const decoded = await vfyExpToken(token)
      req.id = decoded.id
      const foundToken = await findOne(pwdReset, {id: req.id})
      if(foundToken){
         const salt = await genSalt()
      const hash = await genHash(salt, password)
      const update = await findOneAndUpdate(
        users,
        {id: req.id},
        {
          salt,
          hash,
        }
      )
      await findOneAndDelete(pwdReset, {id: req.id}).catch(err => console.log(err))
      res.json({msg: "password updated"})
      }else{
        res.json({err: "Not Authorised or Password Already changed"})
      }
     

    } catch (err) {
      if (err.message === "jwt expired") {
        await findOneAndDelete(pwdReset, {id: req.id})
        res.json({ data: "link expired" });
      }else {
         console.log('err', err);
         res.json({ err: err.message })
      }
     
    }
  } else {
    res.json({ data: "Not Authorized" })
  }
}

module.exports = { sendResetPwdPage, resetPwdLink }