const express = require("express");
const covidRoute = require("./route/covid.route");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
mongoose
  .connect("mongodb://127.0.0.1/covid", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "covid",
  })
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));

app.use(cors("*"));
app.use("/", covidRoute);

app.listen(5000, () => {
  console.log("server started");
});
