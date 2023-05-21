const cron = require("node-cron");
const subscriptions = require('../db/schema/subscriptions')
const webpush = require('web-push')

// const { sendNotification } = require("../controller/notification_c");

// function sendDailyNotification() {
//   // server time is UTC 0 and india is +5:30 HRS
//   // So at 8:30 hrs in india, server had time 0f 3 hrs
//   // 8:30 hrs - 5:30 = 3 hrs to be set on server for cron job
//   cron.schedule("* 3 * * *", sendNotification);
// }

const notification = async(req, res) => {
  if(req.headers['x-cyclic'] === 'cron'){
    const payload = JSON.stringify({ title: "Book My Meal", body: "Book Your Meal Now" });
    const users = await subscriptions.find();
    // console.log("USERS: ", users)
    for (let i = 0; i < users.length; i++) {
      console.log("I: ", i);
      webpush.sendNotification(users[i], payload).catch((err) => {
        console.log("Nottification not sent due to Error: ", err);
        if (err.statusCode == 410) {
          del(err);
        }
      });
    }res.send("Notification Send")
  }else{
    res.send('Not-Authorized')
  }

}

//delete unsuscribed user endpoints
async function del(err) {
  const del = await subscriptions.findOneAndDelete({ endpoint: err.endpoint })
  console.log('deleted', del)
}

module.exports = notification;
