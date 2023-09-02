const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');


app.use(cors({optionsSuccessStatus: 200}));

app.use(express.static('public'));

app.get("/", function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/hello", function (req, res) {
    res.json({greeting: 'hello API'});
});

app.get("/api/:date?", function (req, res) {

    const dateParam = req.params.date;

    if (!dateParam) {
        const now = new Date();
        res.json({unix: now.getTime(), utc: now.toUTCString()});
    }

    if (isValidDate(dateParam)) {
        const date = new Date(dateParam);
        res.json({unix: date.getTime(), utc: date.toUTCString()});
    } else if (!isNaN(dateParam)) {
        const unixTimestamp = parseInt(dateParam); // Parse the Unix timestamp
        const date = new Date(unixTimestamp);
        res.json({unix: date.getTime(), utc: date.toUTCString()});
    } else {
        res.json({error: "Invalid Date"});
    }
});

function isValidDate(dateString) {
    // Attempt to create a Date object from the dateString
    const date = new Date(dateString);
    // Check if the created date is a valid date and the input format is recognized
    return !isNaN(date) && date instanceof Date;
}

const listener = app.listen(process.env.PORT || 3000, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});
