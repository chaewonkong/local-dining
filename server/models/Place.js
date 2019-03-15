const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PointSchema = new Schema({
  type: { type: String, default: "Point" },
  coordinates: { type: [Number], index: "2dsphere" }
});

const MenuSchema = new Schema({
  name: { type: String },
  price: { type: String },
  imageURL: { type: String }
});

const PlaceSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  avgPrice: {
    type: Number
  },
  geometry: PointSchema,
  address: {
    type: String
  },
  menu: [MenuSchema]
});

const Place = mongoose.model("place", PlaceSchema);
module.exports = Place;
