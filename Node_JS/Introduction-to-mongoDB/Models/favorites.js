const {objectId} = require('mongodb');
const {getDb} = require("../utils/dataBaseUtils");


module.exports = class Favorites {
   
  constructor(homeId){
    this.homeId = homeId;
  }
  save(){
    const db = getDb();
    return db.collection('favorites').findOne({homeId: this.homeId})
     .then(exisifav =>{
      if(!exisifav){
        // If favorite does not exist, insert it
        return db.collection('favorites').insertOne(this);
      }
      // If favorite exists, do nothing or handle as needed
      return Promise.resolve({message: "Favorite already exists"});
     })
   
  }

  static getFavorites() {
    const db = getDb();
    return db.collection('favorites').find().toArray();
  }
  
  static deleteById(delHomeId){
   const db = getDb();
   return db.collection('favorites').deleteOne({homeId:delHomeId});
  }
 
};
