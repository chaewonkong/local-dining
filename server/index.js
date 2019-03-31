const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const Place = require("./models/Place");
const keys = require("./config/keys");
const cors = require("cors");
const axios = require("axios");
const multer = require("multer");
const upload = multer();

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

// app.post("/api/places", (req, res) => {
//   const placeProps = req.body;
//   Place.create(placeProps).then(place => {
//     res.send(place);
//   });
// });

app.post("/api/places", upload.array("image"), (req, res) => {
  const images = req.files;
  let { menu, priceRange, name, address, lat, lng, category, tags } = req.body;
  if (menu) menu = JSON.parse(menu);
  if (priceRange) priceRange = JSON.parse(priceRange);
  if (tags) tags = JSON.parse(tags);
  console.log(menu, priceRange, tags);
  res.status(200).send();
});

app.get("/api/places", (req, res) => {
  const { neLat, neLng, swLat, swLng } = req.query;
  Place.where("geometry")
    .within({
      box: [
        [parseFloat(neLng), parseFloat(neLat)],
        [parseFloat(swLng), parseFloat(swLat)]
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
    .get(`https://dapi.kakao.com/v2/local/search/keyword.json?query=${query}`, {
      headers: {
        Authorization: `KakaoAK ${keys.kakaoRESTKey}`
      }
    })
    .then(response => {
      const places = response.data.documents;
      const results = places.map(place => {
        return {
          ...place,
          name: place.place_name,
          address: place.road_address_name,
          category: place.category_name,
          lat: place.y,
          lng: place.x
        };
      });
      res.send(results);
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
