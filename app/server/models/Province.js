const mongoose = require("mongoose");

const ProvinceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  size: { type: String, required: true },
  center: { type: String, required: true },
  sum: { type: Number, required: true },
  team: { type: Number, required: true },
  description: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  imageUrl: { type: String, required: true },
});

module.exports = mongoose.model("Province", ProvinceSchema);