// database connection
const db = require("../utils/databaseUtil");

module.exports = class Home {
  constructor(houseName, price, location, ratting, photoURL, description, id) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.ratting = ratting;
    this.photoURL = photoURL;
    this.description = description;
    this.id = id;
  }
  save() {
    if (this.id) {
      return db.execute(
      "UPDATE homes SET houseName=?,price=?,location=?,ratting=?,photoUrl=?,description=? WHERE id=?",
      [
        this.houseName,
        this.price,
        this.location,
        this.ratting,
        this.photoURL,
        this.description,
        this.id,
      ]
    );
    }else{
       return db.execute(
      "INSERT INTO homes(houseName,price,location,ratting,photoUrl,description) VALUE(?,?,?,?,?,?)",
      [
        this.houseName,
        this.price,
        this.location,
        this.ratting,
        this.photoURL,
        this.description,
      ]
    );
    }
   
  }

  static fetchAll(callback) {
    return db.execute("SELECT * FROM homes");
  }
  static findById(homeId) {
    return db.execute("SELECT * FROM homes WHERE id=?",[homeId]);
  }

  static deleteById(homeId) {
    return db.execute("DELETE  FROM homes WHERE id=?",[homeId])
  }
};
