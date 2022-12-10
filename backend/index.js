const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const usersRoute = require("./routes/users-route");
const servicesRoute = require("./routes/services-route");

const app = express();
app.use(cors());

// Rest API setup

// Parse the request body from json to object format
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use("/users", usersRoute);
app.use("/services", servicesRoute);

app.use((req, res, next) => {
  const error = new Error("Could not find the route", 404);
  next(error);
});

app.use((error, req, res, next) => {
  res
    .status(error.code || 500)
    .json({ message: error.message || "An unknown error occurs" });
});

app.listen(5000, () => {
  console.log("Listening on Localhost:5000");
});
