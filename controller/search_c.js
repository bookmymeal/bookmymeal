const path = require('path')

// utils
const today = require('../utils/today')

//query
const find = require('../db/query/find')

// schema
const booking = require('../db/schema/booking')

async function sendSearchPage(req, res) {
  if (res.decodedToken.role === 'admin') {
    res.sendFile(path.resolve(__dirname, '../static', 'search.html'))
  } else {
    res.send("Not authorized")
  }

}

async function getSearchResult(req, res) {

  if (res.decodedToken.role === 'admin') {
    const from = "2023-02-01" // app start date if not provided by user
    let query = ""; // query object to be set based on user input

    if (!req.body.from) {
      req.body["from"] = from;
    }

    if (!req.body.to) {
      // setting date to today if not given by user
      req.body["to"] = today(330 * 60 * 1000) // passing +5:30 hrs in milisecond for IST
    }

    // if (req.body.from && req.body.to && req.body.user) {
    //   console.log("full query");
    //   query = {
    //     date: { $gte: req.body.from, $lte: req.body.to },
    //     id: req.body.user,
    //   };
    // } else if (req.body.from && req.body.to) {
    //   console.log("partial query");
    //   query = {
    //     date: { $gte: req.body.from, $lte: req.body.to },
    //   };
    // }

    if (req.body.from && req.body.to && req.body.user) {
      console.log("full query");
      query = {
        $and: [
          {
            date: { $gte: req.body.from, $lte: req.body.to }
          },
          {
            $or: [
              { id: req.body.user },
              { firstname: req.body.user },
              { lastname: req.body.user }
            ]
          }
        ]
      };
    } else if (req.body.from && req.body.to) {
      console.log("partial query");
      query = {
        date: { $gte: req.body.from, $lte: req.body.to },
      };
    }

    try {
      const data = await find(booking, query)
      res.json(data)
      // console.log(data)
    } catch (err) {
      res.json(err)
    }

  } else {
    res.send("Not authorized")
  }

}

module.exports = { sendSearchPage, getSearchResult }