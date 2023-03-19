const booking = require('../db/schema/booking')


async function deleteMeal(req, res) {
  console.log('DELETE request', req.body)

  if (res.decodedToken.role === 'admin') {
    const result = await booking.deleteMany({ _id: { $in: req.body.ids } })
    // console.log('DELETED', result)
    res.json({ msg: 'data received' })
  }
  else {
    res.send("Not Authorized")
  }
}


module.exports = deleteMeal