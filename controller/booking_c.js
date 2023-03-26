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
  const {date , meal} = req.body
  const four = req.body.for
  const isBooked = await findOne(booking, {date, meal, id, for: four})
  // const isBooked = await findOne(booking, {...req.body, id, firstname, lastname})
  console.log(req.body)
  console.log('isBooked', isBooked)

  if (isBooked) {
    // front end need to be changed to accept this response
    console.log("Already booked")
    // res.json({ success: "Already Boooked" });
    res.json({ msg: "Already Boooked" });
    return
  } else {
    const {id, firstname, lastname} = res.decodedToken
    const bookingObject = await createDBObject(booking, req.body, {id, firstname, lastname})
    bookingObject
      .save()
      .then(() => {
        console.log("save");
        res.json({ msg: '<b>Congratulations! </b>YourMeal is Booked.' });
      })
      .catch((err) => {
        console.log("Saving error", err);
        res.json({ msg: '<b>Error Occured </b>YourMeal is Not Booked.' });
      });
  }

}

module.exports = { sendBookingPage, saveBooking }