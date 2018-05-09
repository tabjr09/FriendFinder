// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var friends = require('./app/data/friends.js')

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/app/public/home.html"));
});

app.get("/survey", function(req, res) {
  res.sendFile(path.join(__dirname, "/app/public/survey.html"));
});


// Displays all reservations
app.get("/api/friends", function(req, res) {
  return res.json(friends);
});

// Create New tables - takes in JSON input
app.post("/api/friends", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  var newfriend = req.body;

  // Using a RegEx Pattern to remove spaces from newtable
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newfriend.photo = newfriend.photo.replace(/\s+/g, "").toLowerCase();

  console.log(newfriend);



  friends.Friends.push(newfriend);

  res.json(friends);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});


//modules.exports to export friends