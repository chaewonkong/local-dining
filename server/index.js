const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const Place = require("./models/Place");
const keys = require("./config/keys");
const cors = require("cors");
const axios = require("axios");
const multer = require("multer");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");

AWS.config.loadFromPath(__dirname + "/config/awsconfig.json");
let s3 = new AWS.S3();

const upload = multer({
  storage: multerS3({
    s3,
    bucket: "elasticbeanstalk-ap-northeast-2-832813130302/uploads",
    acl: "public-read",
    metadata: function(req, file, cb) {
      cb(null, { fileName: file.fieldname });
    },
    key: function(req, file, cb) {
      let fileName = Date.now().toString() + path.extname(file.originalname);
      cb(null, fileName);
    }
  })
});

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
  const baseURL =
    "https://s3.ap-northeast-2.amazonaws.com/elasticbeanstalk-ap-northeast-2-832813130302/uploads/";
  const images = req.files.map(file => baseURL + file.key);
  let { menu, priceRange, name, address, lat, lng, category, tags } = req.body;
  if (menu) menu = JSON.parse(menu);
  if (priceRange) priceRange = JSON.parse(priceRange);
  if (tags) tags = JSON.parse(tags);
  const geometry = { type: "Point", coordinates: [lng, lat] };

  const placeProps = {
    name,
    menu,
    priceRange,
    tags,
    address,
    geometry,
    category,
    images
  };
  Place.create(placeProps).then(place => {
    res.send(place);
  });
  // res.status(200).send();
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
