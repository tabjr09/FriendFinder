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


app.get("/api/friends", function(req, res) {
  return res.json(friends);
});

app.post("/api/friends", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  var newfriend = req.body;
  var match;

  newfriend.photo = newfriend.photo.replace(/\s+/g, "").toLowerCase();

  console.log("logged from server.js ",newfriend);

 // friends.Friends.push(newfriend);

  match = findMatch(newfriend.scores);

  console.log("match index: " + match);

  //$("#match-name").text(friends.Friends[match].name);
  //$("#match-img").attr("src", friends.Friends[match].photo);

  // Show the modal with the best match
  //$("#results-modal").modal("toggle");


  res.json(friends);
});


  
function findMatch(newfriendscores){
    var results;
    var friendscores=[];

    for(var a = 0; a<friends.Friends.length; a++){
      
      results = 0;
      
      for(var i = 0; i < 10; i++){

        results += (newfriendscores[i] - friends.Friends[a].scores[i]);
        results = Math.abs(results);
        //console.log("results" + i + " "+ results);
        if(a === 0){
          friendscores[0] = 0;
          friendscores[1] = parseInt(results);
        }

      }
      console.log("results" + a + " "+ results);
      if(results < friendscores[1]){ //if the differnce is the lowest
        friendscores[0] = a; //the index of the friend with the lowest score difference
        friendscores[1] = results; //the lowest score difference
        console.log("firendscores: ",friendscores);
      }

      
    }
    return friendscores[0];
}
  

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});


