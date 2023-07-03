// import schema
const booking = require("../db/schema/booking");
const users = require("../db/schema/users");

// email template
const fs = require("fs");
const path = require("path");
const template = fs.readFileSync(
  path.resolve(__dirname, "../static", "email", "emailTemplate.ejs"),
  "utf-8"
);

const ejs = require("ejs");
const cron = require("node-cron");

const sendEmail = require("../auth/sendEmail");

const dailyEmailReport = async (req, res) => {
  if (req.headers["x-cyclic"] === "cron") {
    // generate time

    dateObj = new Date();

    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();

    const localDate = `${day <= 9 ? `0${day}` : day}-${month <= 9 ? `0${month}` : month}-${year}`;
    console.log(localDate);
    const data = {
      time: localDate,
      total: 0,
      lunch: 0,
      dinner: 0,
      eastCanteenL: 0,
      dgenCanteenL: 0,
      dgenControlroomL: 0,
      eastCanteenD: 0,
      dgenCanteenD: 0,
      dgenControlroomD: 0,
    };

    //get data from DB

    const report = await booking.find({
      date: `${year}-${month <= 9 ? `0${month}` : month}-${day <= 9 ? `0${day}` : day}`,
    });
    // const report = await booking.find({date: {$gte: "2023-01-01", $lte: `${year}-${month <= 9 ? `0${month}` : month}-${day}`}})

    report.forEach((element) => {
      data.total += +element.quantity;
      if (element.meal === "lunch") {
        data.lunch += +element.quantity;
        if (element.location === "east canteen") {
          data.eastCanteenL += +element.quantity;
        }
        if (element.location === "dgen canteen") {
          data.dgenCanteenL += +element.quantity;
        }
        if (element.location === "dgen control room") {
          data.dgenControlroomL += +element.quantity;
        }
      }
      if (element.meal === "dinner") {
        data.dinner += +element.quantity;
        if (element.location === "east canteen") {
          data.eastCanteenD += +element.quantity;
        }
        if (element.location === "dgen canteen") {
          data.dgenCanteenD += +element.quantity;
        }
        if (element.location === "dgen control room") {
          data.dgenControlroomD += +element.quantity;
        }
      }
    });

    //   console.log("REPORT: ", report)
    console.log("summary", data);

    const html = ejs.render(template, data);
    //   console.log(html)

    // find email of admin role person
    const emailList = [];
    const admins = await users.find({ role: "admin" });
    admins.forEach((val) => {
      emailList.push(val.email);
    });
    //   console.log("EMAIL List", emailList)

    await sendEmail(emailList, "daily meal Booking", "null", html).catch((err) =>
      console.log(err)
    );
    res.send("Email send");
  }else{
    res.send('Not-Authorized')
  }
};

module.exports = dailyEmailReport;
