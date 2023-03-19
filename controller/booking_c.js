const path = require('path')

//utils
const createDBObject = require('../utils/createDBObject')

//schema
const booking = require('../db/schema/booking')

//query
const findOne = require('../db/query/findOne')

const sendBookingPage = (req, res) => {
  res.sendFile(path.resolve(__dirname, '../static', "booking.html"))
}

const saveBooking = async (req, res) => {
  // const isBooked = await findOne(booking, req.body)
  const {id, firstname, lastname} = res.decodedToken

  const isBooked = await findOne(booking, {...req.body, id, firstname, lastname})
  console.log('isBooked', isBooked)

  if (isBooked) {
    // front end need to be changed to accept this response
    console.log("Already booked")
    res.json({ success: "Already Boooked" });
    return
  } else {
    const {id, firstname, lastname} = res.decodedToken
    const bookingObject = await createDBObject(booking, req.body, {id, firstname, lastname})
    bookingObject
      .save()
      .then(() => {
        console.log("save");
        res.json({ success: true });
      })
      .catch((err) => {
        console.log("Saving error", err);
        res.json({ success: false });
      });
  }

}

module.exports = { sendBookingPage, saveBooking }