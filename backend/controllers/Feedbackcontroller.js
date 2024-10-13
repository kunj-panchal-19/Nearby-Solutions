const Feedback=require('../model/Feedback');
const mongoose=require('mongoose');
const handleFeedbackRegister=async(req,res)=>{
    try{

        const {service_id,Overall_Satisfaction, Quality_Service,Timeliness,Communication,Professionalism,Improve}=req.body;
        // console.log(service_id)
        // console.log(Overall_Satisfaction)
        // console.log(Quality_Service)
        // console.log(Timeliness)
        // console.log(Communication)
        // console.log(Professionalism)
        // console.log(Improve)
        // const s_id=mongoose.Types.ObjectId(service_id);
        const newfeedback= new Feedback({
            "service_id":service_id,
            "Overall_Satisfaction":Overall_Satisfaction,
            "Quality_Service":Quality_Service,
            "Communication":Communication,
            "Improve":Improve,
            "Professionalism":Professionalism,
            "Timeliness":Timeliness
        });
       await newfeedback.save();
        res.status(201).json({ 'success': `New Feedback is created!` });
    }catch(error){
        res.status(500).json({ 'message': error.message 
        });
    }
}

module.exports={handleFeedbackRegister};