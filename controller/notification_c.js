const path = require("path");
const webpush = require("web-push");

// schema
const subscriptions = require("../db/schema/subscriptions");

//query
const find = require("../db/query/find");


const sendNotificationPage = (req, res) => {
  res.sendFile(
    path.resolve(__dirname, "../static", "notification", "notification.html")
  );
};

const subscribe = (req, res) => {
  const subscription = req.body;
  // console.log("new subscription", subscription)
  const doc = new subscriptions(subscription);
  doc
    .save()
    // .then((data) => console.log("data saved: ", data))
    .catch((err) => console.log(err));
  const payload = JSON.stringify({ title: "Book My Meal", body: "Subscription Successful" });
  webpush
    .sendNotification(req.body, payload)
    .catch((err) => console.log("Nottification not sent due to Error: ", err));
  res.json({ subscribed: true });
};

const sendNotification = async (req, res) => {
  if(res.decodedToken.role === 'admin'){
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
    }
    res.send("request recived");
  }else{
    res.send('Not Authorized')
  }

};

async function del(err) {
    const delItem = await subscriptions.findOneAndDelete({ endpoint: err.endpoint })
    console.log('deleted', delItem)
  }

const unsubscribe = async (req, res) => {
  try {
    console.log("EndPoint: ", req.body.endpoint)
    const delSubscription = await subscriptions.findOneAndDelete({ endpoint: req.body.endpoint })
    res.json({subscriptionDeleted: true})
  } catch (error) {
    console.log(error)
    res.json({subscriptionDeleted: false})
  }
}

module.exports = { sendNotificationPage, subscribe, sendNotification, unsubscribe };
