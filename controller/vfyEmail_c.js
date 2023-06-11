// schema
const vfyEmail = require('../db/schema/vfyEmail')
const users = require('../db/schema/users')

//query
const findOne = require('../db/query/findOne')
const findOneAndUpdate = require('../db/query/findOneAndUpdate')
const findOneAndDelete = require('../db/query/findOneAndDelete')

async function confirmEmail(req, res){
  const {token} = req.query
  console.log("Email Token", token)
 try{
   const user = await findOne(vfyEmail, {token})
   if(user){
     await findOneAndUpdate(users, {id: user.id}, {verifiedbyuser: true})
     await findOneAndDelete(vfyEmail, {token})
     res.json({"success": "E-mail Verified successfully"})
   }else{
     res.send("Bad request");
   }
 }catch(err){
   res.json({err: err.message})
 }
}

module.exports = confirmEmail