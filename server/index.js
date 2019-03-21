const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const Place = require("./models/Place");
const keys = require("./config/keys");
const cors = require("cors");
const axios = require("axios");
const katecToLatLng = require("./geoTrans");

mongoose.connect(keys.mongoURI);

const app = express();
app.use(bodyParser.json());
app.use(cors());

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

app.get("/api/search", (req, res) => {
  const query = req._parsedUrl.query
    .split("")
    .splice(6)
    .join("");
  axios
    .get(`https://openapi.naver.com/v1/search/local.json?query=${query}`, {
      headers: {
        "X-Naver-Client-Id": keys.naverSearchClientID,
        "X-Naver-Client-Secret": keys.naverSearchClientSecret
      }
    })
    .then(response => {
      const results = response.data.items.map(item => {
        const { lat, lng } = katecToLatLng(item.mapx, item.mapy);
        return { lat, lng, ...item };
      });
      return res.send({ ...response.data, items: results });
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
