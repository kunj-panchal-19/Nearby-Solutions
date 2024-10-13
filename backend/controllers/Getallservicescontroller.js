
const Service=require('../model/Service');

const handlegetallservices=async (req,res)=>{
    try{
        const userid=req.query.userid;
        const services=await Service.find({"user_id":userid});
        console.log(services);
        res.json(services);
    }catch(e){
        console.log(e.message);
        res.status(500).json({"error":e.message});
    }
}

module.exports= {handlegetallservices}