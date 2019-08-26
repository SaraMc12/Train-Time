
  var config = {
    apiKey: "AIzaSyAwBXwWDmb1-eo-smCuOtm7TWJutKlDn84",
    authDomain: "train-time-d98e6.firebaseapp.com",
    databaseURL: "https://train-time-d98e6.firebaseio.com",
    projectId: "train-time-d98e6",
    storageBucket: "train-time-d98e6.appspot.com",
    messagingSenderId: "1041471592648",
    appId: "1:1041471592648:web:d2a81e20e5951576"
  };
  
  
  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  // 2. Button for adding Employees
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  // var start = moment($("#start-input").val().trim(), "hh:mm");
  var start = $("#start-input").val().trim();
  var frequecy = $("#frequency-input").val().trim();
 console.log(trainName, destination, start, frequecy)
  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: trainName,
    destination: destination,
    start: start,
    frequecy: frequecy
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);



  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#start-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var name = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var start = childSnapshot.val().start;
  var frequency = parseInt(childSnapshot.val().frequecy);

  var next = ""
  var minutesaway = 0
 
///
  // calculate the next and the minutes 
  /// 2:40pm  08:00am 30    current time - origin time then if you divie this 30 remainder in minutes is the minutes away
///


var temp = start.split(":") // ["08", "30"]

var startTrain = moment().hours(temp[0]).minutes(temp[1])
console.log("startTrain", startTrain)


var diff = moment().diff(startTrain, 'minutes')
console.log(diff)

var remainder = diff % frequency  // 265 -- 30   265/30  numbers of trai has passed

var minutesaway = frequency - remainder

// current - start = 265 --- 30 = 265 / 30 = 8--- 8*30 = 240 265 - 240 =25 // 30 -25 = 5

var next = moment().add(minutesaway, "m").format("hh:mm A")
  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(name),
    $("<td>").text(destination),
    $("<td>").text(frequency),
    $("<td>").text(next),
    $("<td>").text(minutesaway)
  );

  // Append the new row to the table
  $("#employee-table > tbody").append(newRow);
});
