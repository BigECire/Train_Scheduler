$(() => {
    console.log("logic running...");
    var firebaseConfig = {
        apiKey: "AIzaSyADijp5I8WH0b-S_2NA_gspJa27fP6YCnQ",
        authDomain: "test-b54d8.firebaseapp.com",
        databaseURL: "https://test-b54d8.firebaseio.com",
        projectId: "test-b54d8",
        storageBucket: "test-b54d8.appspot.com",
        messagingSenderId: "293525362641",
        appId: "1:293525362641:web:b60a1c63e07be398"
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
    
    var database = firebase.database();
    
    $("#add-train-btn").on("click", function (event) {
        event.preventDefault();
    
        var trainName = $("#train-name-input").val().trim();
        var trainDestination = $("#destination-input").val().trim();
        var trainStart = moment($("#start-input").val().trim(), "MM/DD/YYYY").format("X");
        var trainRate = $("#rate-input").val().trim();
    
        var newTrain = {
            name: trainName,
            destination: trainDestination,
            start: trainStart,
            rate: trainRate
        };
    
        database.ref().push(newTrain);
    
        console.log(newTrain.name);
        console.log(newTrain.destination);
        console.log(newTrain.start);
        console.log(newTrain.rate);
    
        alert("Train successfully added");
    
        $("#train-name-input").val("");
        $("#destination-input").val("");
        $("#start-input").val("");
        $("#rate-input").val("");
    });
    
    database.ref().on("child_added", function (childSnapshot) {
        console.log(childSnapshot.val());
    
        var trainName = childSnapshot.val().name;
        var trainDestination = childSnapshot.val().destination;
        var trainStart = childSnapshot.val().start;
        var trainRate = childSnapshot.val().rate;
    
        console.log(trainName);
        console.log(trainDestination);
        console.log(trainStart);
        console.log(trainRate);
    
        var trainMins = trainRate - (trainMins % trainRate);
        console.log(trainMins);
    
        var trainNext = moment().add(trainMins, 'm');
        console.log(trainNext);
    
        var newRow = $("<tr>").append(
            $("<td>").text(trainName),
            $("<td>").text(trainDestination),
            $("<td>").text(trainRate),
            $("<td>").text(trainMins),
            $("<td>").text(trainNext)
        );
    
        $("#train-table > tbody").append(newRow);
    });

})