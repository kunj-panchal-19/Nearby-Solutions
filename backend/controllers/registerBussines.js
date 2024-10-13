const Bussines=require('../model/Bussines');

const handleBussinesRegister=async(req,res) => {
    const {name,description,longitude,latitude}=req.body;

    try{
    const newBussines=await Bussines.create({
        "name" : name,
        "description" : description,
        "location": {
            type: 'Point',
            coordinates: [longitude, latitude]
          }
    });
    res.status(201).json({ 'success': `New Bussines ${name} created!` });
}catch (err) {
    res.status(500).json({ 'message': err.message });
}
};

module.exports={handleBussinesRegister};