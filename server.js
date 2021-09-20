const express = require('express');
var https = require('https');
const path = require('path');
const trainDetails = require('./server/traindetails');
const journeyAPI = require('./server/journeyAPI');
const { MongoClient } = require('mongodb');
const { assert } = require('console');
const bodyParser = require('body-parser');
const { CONSOLE_APPENDER } = require('karma/lib/constants');

const port = 3000;
const app = express();
const mongoUrl = 'mongodb://localhost:27017';
const client = new MongoClient(mongoUrl);
const dbName = 'EPA-JM-Project';

app.use(express.static(path.join(__dirname, 'dist/EPA-JM-Project')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/EPA-JM-Project/index.html'));
});

app.set('port', port);

const server = app.listen(port, () => console.log(`Server running on localhost:${port}`));

app.get('/trainDetails', async function(req, res) {
    try {
        const details = trainDetails.TRAIN_DETAILS;

        res.status(200);
        res.json({ trainDetails: details});
    } catch(error) {
        console.log(error.message);
        res.status(400);
        res.send("Bad request");
    }
});

app.get('/mongo/currentBookings', function(req, res) {
    
    client.connect(function(err) {
        console.log("Connected to mongo server");

        const db = client.db(dbName);

        journeyAPI.getCurrentBookings(db, function(result) {
            client.close();

            res.json(result);
            res.status(200);
        });
    });
})

app.post('/mongo/create/reservation', function(req, res) {

    client.connect(function(err) {
        const db = client.db(dbName);

        journeyAPI.updateBooking(db, req.body.Journey, function(result) {
            client.close();

            res.json(result);
            res.status(200);
        })
    })
})

app.post('/mongo/create/initialiseJourneys', function(req, res) {

    client.connect(function(err) {
        console.log("Connected to mongo server");

        const db = client.db(dbName);

        journeyAPI.createJourneys(db, function(result) {
            client.close();

            res.json(result);
            res.status(200);
        })
    })
});
