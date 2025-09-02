const mongoose = require("mongoose");

const TripsSchema = new mongoose.Schema({
  // userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  userEmail: { type: String, required: true },
  provinceId: { type: mongoose.Schema.Types.ObjectId, ref: "Province", required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  activitiesId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Activities", required: true, index: true }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Trips", TripsSchema);
