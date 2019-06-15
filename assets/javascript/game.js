var config = {
    apiKey: "AIzaSyCv3-viM9OVa0kQ1j44MyyNRBmeli6TFks",
    authDomain: "fir-63561.firebaseapp.com",
    databaseURL: "https://fir-63561.firebaseio.com",
    projectId: "fir-63561",
    storageBucket: "fir-63561.appspot.com",
    messagingSenderId: "393438842588",
    appId: "1:393438842588:web:4c254e037b6e3b5e"
    };

firebase.initializeApp(config);
var database = firebase.database();
var trainName;
var trainDestination;
var trainFrequency;
var trainTime;
var interval = 1000 * 60;
var intervalId = setInterval(function() {
    getData();
}, interval);
getData();
function getData() {
    $("#trains").empty();
    database.ref().on("child_added", function(snapshot) {
        trainName = snapshot.val().name;
        trainDestination = snapshot.val().destination;
        trainFrequency = parseInt(snapshot.val().frequency);
        trainTime = snapshot.val().time;
        postTrain();
    });
}

function findTime() {
    var getTime = moment().format('LT');
    var min = parseInt(getTime.split(":")[1].split(" ")[0]);
    var hr = parseInt(getTime.split(":")[0]);
    if (hr === 12)
        hr -= 12;
    if (getTime.split(" ")[1] === "PM")
        hr += 12;
    var currTime = hr * 60 + min;
    var trainiStartTime = parseInt(trainTime.split(":")[0]) * 60 + parseInt(trainTime.split(":")[1]);

    return currTime - trainiStartTime;
}
function countTime(minAway) {
    var getTime = moment().format('LT');
    var min = parseInt(getTime.split(":")[1].split(" ")[0]) + minAway;
    var hr = parseInt(getTime.split(":")[0]);
    var day = 0;
    var minStr;

    if (getTime.split(" ")[1] === "PM")
        hr += 12;
    if (min >= 60) {
        hr += Math.floor(min / 60);
        min = min % 60;
    }
    if (min < 10)
        minStr = "0" + min;
    else 
        minStr = "" + min;
    if (hr > 24) {
        day += Math.floor(hr / 24);
        hr = hr % 24;
        return `+${day} ${hr}:${minStr}`;
    }
    else if (hr < 10) 
        return `0${hr}:${minStr}`;
    else 
        return `${hr}:${minStr}`;
}
function postTrain() {
    var newTrain = $("<tr>");
    var newName = $("<td>");
    var newDestination = $("<td>");
    var newFrequency = $("<td>");
    var newArrival = $("<td>");
    var newMinutes = $("<td>");
    var minutesAway;
    
    if (findTime() <= 0) {
        minutesAway = Math.abs(findTime());
    }
    else {
        minutesAway = trainFrequency - findTime() % trainFrequency;
    }
    newName.text(trainName).appendTo(newTrain);
    newDestination.text(trainDestination).appendTo(newTrain);
    newFrequency.text(trainFrequency).appendTo(newTrain);
    if (findTime() <= 0) {
        newArrival.text(trainTime).appendTo(newTrain);
    }
    else {
        newArrival.text(countTime(minutesAway)).appendTo(newTrain);
    }
    newMinutes.text(minutesAway).appendTo(newTrain);
    newTrain.appendTo($("#trains"));
}

$("#submit-train").on("click", function(event) {
    event.preventDefault();
    trainName = $("#trainName").val();
    trainDestination = $("#destination").val();
    trainFrequency = parseInt($("#frequency").val());
    trainTime = $("#trainTime").val();

    database.ref().push({
      name: trainName,
      destination: trainDestination,
      frequency: trainFrequency,
      time: trainTime
    })
  
});

$("#clear").on("click", function(event) {
    database.ref().set({

    });
});