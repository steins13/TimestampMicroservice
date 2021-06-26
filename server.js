// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


// Timestamp Microservice project start
app.get("/api/", (req, res) => {
  res.json({
    "unix": new Date().getTime(),
    "utc": new Date().toUTCString()
  })
})

app.get("/api/:date?", (req, res, next) => {
  let UTCString = "";

  //garbage code start
  if (/[a-z]/ig.test(req.params.date)) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let monthsShort = ["Jan", "Feb", "Mar", "Apr", "May", "June", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    let split = req.params.date.split(" ")
    let shift = split.shift()
    let shift2 = split.shift()

    if (shift2 === "January" || shift2 === "February" || shift2 === "March" || shift2 === "April" || shift2 === "May" || shift2 === "June" || shift2 === "July" || shift2 === "August" || shift2 === "September" || shift2 === "October" || shift2 === "November" || shift2 === "December") {
      if (shift2.length === 3) {
        for (let i = 0; i <= monthsShort.length - 1; i++) {
          if (shift2 === monthsShort[i]) {
            let index = monthsShort.indexOf(shift2);
            split.push((index + 1).toString());
          }
        }
      } else {
        for (let i = 0; i <= months.length - 1; i++) {
          if (shift2 === months[i]) {
            let index = months.indexOf(shift2);
            split.push((index + 1).toString());
          }
        }
      }
    } else {
      res.json({
        "error": "Invalid Date"
      })
    }

    split.push(shift)
    let join = split.join("-")
    UTCString = new Date(join).toUTCString()
  }
  //garbage code end

  else if (/-/.test(req.params.date)) {
    UTCString = new Date(req.params.date).toUTCString()
  } 
  
  else {
    UTCString = new Date(parseInt(req.params.date)).toUTCString()
  }

  if (UTCString === "Invalid Date" || UTCString === null) {
    res.json({
      "error": "Invalid Date"
    })
  }

  res.json({
    "unix": new Date(UTCString).getTime(),
    "utc": UTCString
  })
})
//Timestamp microservice project end



// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + 3000);
});


