const mongoose = require("mongoose");
const covidschema = new mongoose.Schema({
  Date: {
    type: Date,
  },
  "Country/Region": {
    type: String,
    required: true,
  },

  Confirmed: {
    type: String,
    required: true,
  },

  Deaths: {
    type: String,
    required: true,
  },

  Recovered: {
    type: String,
    required: true,
  },

  Active: {
    type: String,
    required: true,
  },

  "New cases": {
    type: String,
    required: true,
  },

  "New deaths": {
    type: String,
    required: true,
  },
  "New recovered": {
    type: String,
    required: true,
  },

  "WHO Region": {
    type: String,
    required: true,
  },
});

const Covid = mongoose.model("Covid", covidschema);

module.exports = Covid;
