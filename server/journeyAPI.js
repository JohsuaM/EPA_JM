const trainDetails = require('./traindetails');

let journeyAPI = function() {};

journeyAPI.getCurrentBookings = function(db, callback) {
    // Get the Journeys collection
    const collection = db.collection('Journeys');
    // Get documents in the collection that are for the current day
    var dateObj = new Date();
    var day = dateObj.getUTCDate();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var year = dateObj.getUTCFullYear();
    collection.find({"Day": day, "Month": month, "Year": year}).toArray(function(err, docs) {
        if(!err) {
            callback(docs);
        } else {
            console.log(err.message);
            callback(err.message);
        }
    })
}

journeyAPI.updateBooking = function(db, journey, callback) {
    // Get the Journeys collection
    const collection = db.collection('Journeys');
    // Update the document that matches the journey id
    collection.updateOne({JourneyId: journey.JourneyId}, {$set: {Reservations: journey.Reservations, TotalPassengers: journey.TotalPassengers}}, function(err, result) {
        callback(result);
    })
}

journeyAPI.createJourneys = async function(db, callback) {
    var dateObj = new Date();
    var day = dateObj.getUTCDate();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var year = dateObj.getUTCFullYear();

    let journeys = [];

    let collection = db.collection("Journeys");

    collection.find({}).toArray(function(err, docs) {
        currentID = docs.length;
        for(let train of trainDetails.TRAIN_DETAILS) {
            for (let station of train.STATION_DEPARTURES) {
                for (let departureTime of station.TIMES) {
                    journeys.push({
                        JourneyId: currentID,
                        Year: year,
                        Month: month,
                        Day: day,
                        Hour: departureTime.h,
                        Min: departureTime.m,
                        Reservations: [],
                        TotalPassengers: 0,
                        TrainName: train.TRAIN_NAME,
                        Destination: station.DESTINATION,
                        Departure: station.STATION
                    });
                    currentID += 1;
                }
            }
        }

        collection.insertMany(journeys, function(err, result) {
            console.log("Inserted today's journey templates");
            callback(result);
        });
    });
}

module.exports = journeyAPI;