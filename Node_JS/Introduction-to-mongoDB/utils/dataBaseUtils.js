const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;

const mongoURL = "mongodb+srv://manimohan2056:1996200201@cluster01.o0snebr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster01"
let _db;
const mongoConnect =(callback)=>{
MongoClient.connect(mongoURL).then((client)=>{
    _db = client.db("airbnb");
    callback();
}).catch((err)=>{
    console.error("Error connecting to MongoDB:", err);
})
}

const getDb =()=>{
    if (_db){
        return _db;
    } else{
        throw new Error("No database found!")
    }
        
   
}
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;