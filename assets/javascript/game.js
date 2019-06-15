var firebaseConfig = {
    apiKey: "AIzaSyCv3-viM9OVa0kQ1j44MyyNRBmeli6TFks",
    authDomain: "fir-63561.firebaseapp.com",
    databaseURL: "https://fir-63561.firebaseio.com",
    projectId: "fir-63561",
    storageBucket: "fir-63561.appspot.com",
    messagingSenderId: "393438842588",
    appId: "1:393438842588:web:4c254e037b6e3b5e"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.database();
var trainName;
var trainDestination;
var trainFrequency;
var tarinTime;