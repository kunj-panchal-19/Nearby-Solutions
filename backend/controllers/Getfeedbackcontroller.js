const Feedback=require('../model/Feedback');
const Service=require('../model/Service');

const handlegetfeedback=async (req,res)=>{
    try{
        const service_id=req.query.service_id;
        const name=req.query.name;
        const result=await Feedback.find({"service_id":service_id});
        console.log(result);
        res.json(result);
    }catch(e){
        console.log(e.message);
        res.status(500).json({"error":e.message});
    }
}

module.exports= {handlegetfeedback}