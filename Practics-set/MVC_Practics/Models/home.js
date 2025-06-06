//core module
const fs = require('fs')
const path = require('path')
const rootDir = require('../utils/pathUtil')
const homeDataPath = path.join(rootDir,"data","home.json")

//fake dataBase
//const registeredHomes = [];

module.exports = class Home{
 constructor(houseName,price,location,rating,photoUrl){
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
 }
 save(){
   
   Home.fetchAll((registeredHomes)=>{
    if(this.id){ // if id is present, it means we are updating an existing home
      registeredHomes = registeredHomes.map(home => home.id === this.id ? this : home);
    }else{ // if id is not present, it means we are adding a new home
      this.id = Math.random().toString()
      registeredHomes.push(this);
    }
    
    //const homeDataPath = path.join(rootDir,"data","home.json")
    fs.writeFile(homeDataPath,JSON.stringify(registeredHomes), error =>{
      console.log('Data written to file successfully');
    })
   })  
   
 }

 static fetchAll(callback){
   // const homeDataPath = path.join(rootDir,"data","home.json") 
   fs.readFile(homeDataPath, (err,data)=>{
      callback(!err ? JSON.parse(data) :[])
   })
    
 }
 static findById(homeId,callback){
   this.fetchAll(homes =>{
     const homeFound = homes.find(home => home.id === homeId)
     callback(homeFound);
   })
    
 }

  static deleteById(homeId,callback){
   this.fetchAll(homes =>{
     homes = homes.filter(home =>home.id !== homeId)
    // const homeDataPath = path.join(rootDir,"data","home.json")
     fs.writeFile(homeDataPath,JSON.stringify(homes),callback)
     
   })
    
 }

}

