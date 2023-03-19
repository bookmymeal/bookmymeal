const adminPwd = process.env.adminPwd
const vfyAdminPwd = (req, res, next) => {
  const {pwd} = req.body
  if(pwd === adminPwd){
    next()
  }else{
    res.json({err: 'Not authorized'})
  }
}


module.exports = vfyAdminPwd