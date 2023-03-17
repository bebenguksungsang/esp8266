var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://arikun:12345678A@pptikio3.sglpxl7.mongodb.net/?retryWrites=true&w=majority";


MongoClient.connect(url, function(err, db){
    if (err) throw err;
    var myStudent = { name: "Jai Sharma", address: "E-3, Arera Colony, Bhopal" };
    db.collection("tanah").insertOne(myStudent, function (err, result) {
        if (err) throw err;
        console.log("1 Recorded Inserted");
        db.close();
    });
});