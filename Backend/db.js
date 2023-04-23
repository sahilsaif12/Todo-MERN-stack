const mongoose=require('mongoose');
const mongoURI="mongodb+srv://sahilsaif2002:yAdvv24DY6PCQ2SM@cluster0.higvabx.mongodb.net/test"

const connectToMongo=()=>{
    mongoose.connect(mongoURI)
}
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

module.exports=connectToMongo