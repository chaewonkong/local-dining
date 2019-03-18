const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const Place = require("./models/Place");
const keys = require("./config/keys");

mongoose.connect(keys.mongoURI);

const app = express();
app.use(bodyParser.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

app.post("/api/places", (req, res) => {
  const placeProps = req.body;
  Place.create(placeProps).then(place => {
    res.send(place);
  });
});

app.get("/api/places", (req, res) => {
  const { nex, ney, swx, swy } = req.query;
  Place.where("geometry")
    .within({
      box: [
        [parseFloat(nex), parseFloat(ney)],
        [parseFloat(swx), parseFloat(swy)]
      ]
    })
    .then(places => res.send(places));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
