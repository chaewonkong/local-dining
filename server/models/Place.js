const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PointSchema = require("./Point");

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
  priceRange: {
    type: [Number]
  },
  geometry: PointSchema,
  address: {
    type: String,
    required: true
  },
  category: {
    type: String
  },
  images: { type: [String] },
  menu: [MenuSchema],
  phone: {
    type: String
  }
});

const Place = mongoose.model("place", PlaceSchema);
module.exports = Place;
