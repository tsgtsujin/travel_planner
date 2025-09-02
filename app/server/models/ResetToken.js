const mongoose = require("mongoose");

const ResetTokenSchema = new mongoose.Schema({
    email: { type: String, required: true },
    token: { type: String, required: true },
    expireAt: { type: Date, required: true },
});

module.exports = mongoose.model("ResetToken", ResetTokenSchema);
