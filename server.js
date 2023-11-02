const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let receivedId; // Variable to store the received id

// Define a route to handle the POST request
app.post('/server.js', (req, res) => {
    // Access the data sent from the HTML JavaScript
    receivedId = req.body.id; // Assuming the data sent was named 'id'

    // Respond with a confirmation or any other response
    res.json({ message: 'Data received successfully', receivedId: receivedId });

});

let intId = parseInt(receivedId)

