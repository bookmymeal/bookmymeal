const nodemailer = require('nodemailer')
const sendEmailPass = process.env['emailPass']

async function sendEmail(to, subject, link) {

  let transporter = nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'rajubapukaka@gmail.com', // generated ethereal user
      pass: sendEmailPass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'rajubapukaka@gmail.com', // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    text: link, // plain text body
    //   html: `<h1>BMM Testing</h1>`, // html body
  });

  console.log("Message sent: %s", info.messageId);

}

//   main().catch(console.error)


module.exports = sendEmail