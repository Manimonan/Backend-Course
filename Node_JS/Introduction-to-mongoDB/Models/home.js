
const { ObjectId } = require("mongodb");
const {getDb} = require("../utils/dataBaseUtils")


module.exports = class Home{
 constructor(houseName,price,location,rating,photoUrl,_id){
   
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
    if(_id){
      this._id = _id
    };
   
 }
 save(){
   const db = getDb();
   if (this._id) {
     // Update existing home
     const updateFilds = {
      houseName:this.houseName,
      price:this.price,
      location:this.location,
      rating:this.rating,
      photoUrl: this.photoUrl};
     return db.collection('homes').updateOne(
       { _id: new ObjectId(String(this._id)) },
       { $set: updateFilds }
     );
      
   }else{
     // Insert new home
    return db.collection('homes').insertOne(this);
   }
   
      
 }

 static fetchAll(){
  const db = getDb();
  return db.collection('homes').find().toArray();
    
 }
 static findById(homeId){
  const db = getDb();
  return db.collection('homes').find({_id: new ObjectId(String(homeId))}).next();
    
 }

  static findByIdAndDelete(homeId){
  const db = getDb();
  return db.collection('homes').deleteOne({_id: new ObjectId(String(homeId))});
    
 }

}

