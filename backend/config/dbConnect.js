const mongoose = require('mongoose');
// require('dotenv').config({ path: 'ENV_FILENAME' });

const dbConnect=async()=>{
   try{
       await mongoose.connect(process.env.DB_URL
       );
       mongoose.connection.db.collection('services').createIndex({ "location.coordinates": "2dsphere" });
       console.log("connected to database!!");
   }catch(err){
    // console.log("hll
    console.log(err);
   }
}


module.exports=dbConnect;