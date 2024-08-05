let mongodb = require("mongodb").MongoClient;
let url = "mongodb://127.0.0.1:27017";

const config = () =>{
    return new Promise((resolve,reject)=>{
        mongodb.connect(url).then((connection)=>{
            const db = connection.db("practise");
            resolve(db);
        }).catch((error)=>console.log("Database nor connected",error))
    })
}

exports.createData = (formData,collectionName) =>{
    return new Promise((resolve,reject)=>{
        config().then((db)=>{
           const insertedRes =  db.collection(collectionName).insertOne(formData);
           resolve(insertedRes);
        }).catch((error)=>{
            console.log("Data not inserted",error)
        }) 
    })
};