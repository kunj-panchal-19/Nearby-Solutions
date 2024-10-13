const mongoose = require('mongoose');

const feedbackschema=new mongoose.Schema({
    service_id:{
        type: String,
        required:true
    },
    Overall_Satisfaction:{
        type: Number,
        required:true
    },
    Quality_Service:{
        type: Number,
        required:true
    },
    Timeliness:{
        type: Number,
        required:true
    },
    Communication:{
        type: Number,
        required:true
    },
    Professionalism:{
        type: Number,
        required:true
    },
    Improve:{
        type:String,
        required:true
    }
});

module.exports=mongoose.model('Feedback',feedbackschema);