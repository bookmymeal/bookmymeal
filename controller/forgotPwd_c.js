const path = require('path')

// env
const domain = process.env.domain

// query
const findOne = require('../db/query/findOne')

//schema
const users = require('../db/schema/users')
const pwdReset = require('../db/schema/pwdReset')

// auth
const genExpiringToken = require('../auth/genExpiringToken')
const sendEmail = require('../auth/sendEmail')

// utils
const createDBObject = require('../utils/createDBObject')


const sendForgotPwdPage = (req, res) => {
  res.sendFile(path.resolve(__dirname, '../static/forgotPwd.html'))
}

const sendForgotPwdLink = async (req, res) => {
  const { email } = req.body
  const user = await findOne(users, { email })

  if (user) {
    const resetPwdToken = await findOne(pwdReset, { id: user.id })

    if (resetPwdToken) {
      await sendEmail(
        user.email,
        "BMM Reset Your Password",
        `${domain}/resetPwd?token=${resetPwdToken.token}`
      )
      res.json({ msg: "Reset Password link again send To Your Email" })
    } else {
      // if token is not in db
      if (user.verifiedbyadmin) {
        const token = await genExpiringToken({ id: user.id }, 15)

        const resetTokenToDB = await createDBObject(pwdReset, { id: user.id, token: token })
        resetTokenToDB
          .save()
          .then(() => {
            sendEmail(
              user.email,
              "BMM Reset Your Password",
              `${domain}/resetPwd?token=${token}`
            )
          })
        res.json({ msg: "Reset Password Send To Your Email" })
      } else {
        res.json({ msg: "verification is pending" })
      }
    }
  } else {
    res.json({ msg: "user not found" })
  }

}

module.exports = { sendForgotPwdPage, sendForgotPwdLink }