const mongoose = require("mongoose");

const ActivitiesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  province_id: { type: mongoose.Schema.Types.ObjectId, ref: "Province", required: true },
  location: { type: String, required: true },
  area: { type: String, required: false },
  height: { type: String, required: false },
  depth: { type: String, required: false },
  length: { type: String, required: false },
  width: { type: String, required: false },
  level: { type: String, required: false },
  mostDepth: { type: String, required: false },
  water: { type: String, required: false },
  year: { type: Date, required: false },
  timeTable: { type: Array, required: false },
  kidPayment: { type: String, required: false },
  adultPayment: { type: String, required: false },
  foreignPayment: { type: String, required: false },
  photoPayment: { type: String, required: false },
  videoPayment: { type: String, required: false },
  description: { type: String, required: false },
  latitude: { type: Number, required: false },
  longitude: { type: Number, required: false },
  imageUrl: { type: Array, required: false },
});

module.exports = mongoose.model("Activities", ActivitiesSchema);