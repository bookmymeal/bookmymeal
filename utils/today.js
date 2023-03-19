// give UTC local time zone val in minutes as argument to the function
// return value is local date
// new Date() objetc creates time out of epoch since 1970 at UTC 0

// for more detail https://www.epochconverter.com/

// JavaScript Date objects represent a single moment in time in a platform-independent format. Date objects encapsulate an integral number that represents milliseconds since the midnight at the beginning of January 1, 1970, UTC (the epoch).


function today(UTC_TimeZone){

  let dateAndTime = new Date(Date.now() + (UTC_TimeZone * 60 * 1000)); 
  // add UTC+5:30 = 330 minute to chnage to IST

    let dateString = dateAndTime.toISOString();
    let date = dateString.split("T")[0];
    return date;
}

module.exports =  today