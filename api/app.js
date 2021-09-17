const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const userRoute = require("./api/routes/userRoute");
const loginRoute = require("./api/routes/loginRoute");
const pokedexRoute = require("./api/routes/pokedexRoute");

mongoose.connect("mongodb://localhost:27017/DesenvWeb1", { useMongoClient: true }).then(() => console.log("Server up!"));

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/users", userRoute);
app.use("/login", loginRoute);
app.use("/pokedex", pokedexRoute);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
