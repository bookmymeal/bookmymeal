// import schema
const booking = require("../db/schema/booking");

// email template
const fs = require('fs')
const path = require('path')
const template = fs.readFileSync(path.resolve(__dirname, '../static', 'email','emailTemplate.ejs'), 'utf-8')

const ejs = require("ejs");
const cron = require('node-cron')

const sendEmail = require("../auth/sendEmail");

async function dailyEmailReport() {
  // generate time

  dateObj = new Date();

  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();

  const localDate = `${day}-${month <= 9 ? `0${month}` : month}-${year}`;
  console.log(localDate);
  const data = {
    time: localDate,
    total: null,
    lunch: null,
    dinner: null,
    eastCanteenL: null,
    dgenCanteenL: null,
    dgenControlroomL: null,
    eastCanteenD: null,
    dgenCanteenD: null,
    dgenControlroomD: null,
  };

  //get data from DB

  const report = await booking.find({
    date: `${year}-${month <= 9 ? `0${month}` : month}-${day}`,
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
        data.dgenControlroomD = +(+element.quantity);
      }
    }
  });

  //   console.log("REPORT: ", report)
  console.log("summary", data);

  const html = ejs.render(template, data);
  //   console.log(html)

  sendEmail("kdkothari7@gmail.com", "daily meal Booking", 'null', html).catch(
    (err) => console.log(err)
  );
}

function sendDailyEmailReport(){
    // 9hrs indian time
    cron.schedule("30 3 * * *", dailyEmailReport);
}
module.exports = sendDailyEmailReport