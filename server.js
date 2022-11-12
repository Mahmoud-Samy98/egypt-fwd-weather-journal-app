// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

// dependencies
const bodyParser = require("body-parser");

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 8000;

const server = app.listen(port, () => {
  console.log("server running in localhost: " + port);
});

// Initialize Routes

// Get Request
app.get("/all", getData);

function getData(req, res) {
  res.send(projectData);
  projectData = [];
}

// Post Request

app.post("/add", postData);

function postData(req, res) {
  newData = {
    date: req.body.date,
    temp: req.body.temp,
    content: req.body.content,
  };
  projectData.push(newData);
}
