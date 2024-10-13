const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
   name:{
    type:String,
    required:true
   },
   user_id:{
    type:String,
    required:true
   },
   
   price:{
    type:Number,
    required : true
   },
   description: {
    type: String,
    required: true
  },
  category:{
    type:String,
    required:true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
   availability:{
    type:Boolean,
    required : true
   },
   totalRating:{
    type: Number,
    default: 0
   },
   numberOfFeedbacks:{
    type: Number,
    default: 0
   },
   ratedFor:{
    type:String,
    required:true
   },
   photo:{
    type:String,
    required:true
   }
});
serviceSchema.index({location:'2dshere'});
module.exports=mongoose.model('Service',serviceSchema);
// export default mongoose.model('Service',serviceSchema);