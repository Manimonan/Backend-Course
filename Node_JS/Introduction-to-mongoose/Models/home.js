const mongoose= require("mongoose");


const homeSchema = new mongoose.Schema({
 houseName :{
  type: String,
  required: true,
 },
 price: {
  type: Number,
  required: true,
 },
 location: {
  type: String,
  required: true,
 },
 rating:{
  type: Number,
  required: true,
  min: 0,
  max: 5
 },
 photoUrl: {
  type: String,
 },
  description: {
    type: String,
  },
});
// Middleware to delete associated favorites when a home is deleted
homeSchema.pre('findOneAndDelete', async function(next) {
  const homeId = this.getQuery()._id;
  try {
    // Delete associated favorites
    await mongoose.model('Favorites').deleteMany({ homeId: homeId });
    next();
  } catch (error) {
    next(error);
  }
});
module.exports = mongoose.model("Home", homeSchema);