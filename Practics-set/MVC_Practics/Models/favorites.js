//core module
const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtil");


//fake dataBase

const favoritesDataPath = path.join(rootDir, "data", "favorites.json");

module.exports = class Favorites {
  static addtofavorites(homeId, callback) {
    Favorites.getFavorites((favorites) => {
      const idStr = String(homeId);
      if (favorites.includes(idStr)) {
        console.log("Home already in favorites");
      } else {
        favorites.push(homeId);
        fs.writeFile(favoritesDataPath, JSON.stringify(favorites), callback);
      }
    });
  }

  static getFavorites(callback) {
    fs.readFile(favoritesDataPath, (err, fileContent) => {
      callback(!err ? JSON.parse(fileContent) : []);
    });
  }
  
  static deleteById(delHomeId,callback){
     Favorites.getFavorites((homeIds) => {
      const idStr = String(homeIds);
      homeIds = homeIds.filter(idStr => delHomeId !== idStr)
      fs.writeFile(favoritesDataPath, JSON.stringify(homeIds),error =>{
        if (error) {
          console.log('file not delete',error)
        }
      })
    });
  }
 
};
