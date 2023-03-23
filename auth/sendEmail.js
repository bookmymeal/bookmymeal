const nodemailer = require('nodemailer')
const sendEmailPass = process.env.emailPass
const email = process.env.email
const smtpRelayHost = process.env.smtpRelayHost
const emailSender = process.env.emailSender

async function sendEmail(to, subject, link) {

  let transporter = nodemailer.createTransport({
    host: smtpRelayHost,
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: email, // generated ethereal user
      pass: sendEmailPass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: emailSender, // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    text: link, // plain text body
    //   html: `<h1>BMM Testing</h1>`, // html body
  });

  console.log("Message sent: %s", info.messageId);

}

  sendEmail().catch(console.error)


module.exports = sendEmail