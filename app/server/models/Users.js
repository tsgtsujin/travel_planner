const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    password: String,
    resetToken: String,
    resetTokenExpiry: Date,
})

const UsersModel = mongoose.model("users", UserSchema)
module.exports = UsersModel