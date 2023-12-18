// defining the server port
const port = 5000;

// initializing installed dependencies
const express = require("express");
require("dotenv").config();
const axios = require("axios");
const app = express();
const cors = require("cors");
app.use(cors());

// listening for port 5000
app.listen(5000, () => console.log(`Server is running on ${port}`));

// route: /current - returns current weather data
app.get("/current", (req, res) => {
  const options = {
    method: "GET",
    url: "https://api.weatherapi.com/v1/current.json",
    params: {
      key: process.env.WEATHER_API_KEY,
      q: req.query.q,
      aqi: "no",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      res.json(response.data);
    })
    .catch(function (error) {
      res.send("ERROR");
      console.error(error);
    });
});

// route: /forecast - returns forecast weather data
app.get("/forecast", (req, res) => {
  const options = {
    method: "GET",
    url: "http://api.weatherapi.com/v1/forecast.json",
    params: {
      key: process.env.WEATHER_API_KEY,
      q: req.query.q,
      days: "3",
      aqi: "no",
      alerts: "no",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      res.json(response.data);
    })
    .catch(function (error) {
      res.send("ERROR");
      console.error(error);
    });
});

// route: /search - returns forecast weather data
app.get("/search", (req, res) => {
  const options = {
    method: "GET",
    url: "http://api.weatherapi.com/v1/search.json",
    params: {
      key: process.env.WEATHER_API_KEY,
      q: req.query.q,
    },
  };

  axios
    .request(options)
    .then(function (response) {
      res.json(response.data);
    })
    .catch(function (error) {
      res.send("ERROR");
      console.error(error);
    });
});
