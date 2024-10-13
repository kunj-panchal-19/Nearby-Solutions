const Service=require('../model/Service');

const handleServiceRegister=async(req,res) => {
    try{
    const {name,user_id,description,longitude,latitude,price,category,availability,photo,ratedFor}=req.body;

    
    const newService=await Service.create({
        "name" : name,
        "user_id":user_id,
        "description" : description,
        "location": {
            type: 'Point',
            coordinates: [latitude,longitude]
          },
          "price":parseInt(price),
          "availability":availability,
          "category":category,

          "ratedFor":ratedFor,
          "photo":photo
    });
    res.status(201).json({ 'success': `New Bussines ${name} created!` });
    console.log("success");
}catch (err) {
    res.status(500).json({ 'message': err.message });
    console.log(err.message);
    console.log("failed");
}
};

module.exports={handleServiceRegister};