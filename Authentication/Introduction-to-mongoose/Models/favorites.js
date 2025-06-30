const mongoose = require("mongoose")

const favoriteSchema = new mongoose.Schema({
  homeId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Home",
    required: true,
    unique: true
  }
})
module.exports = mongoose.model("Favorites", favoriteSchema);