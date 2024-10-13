const Service=require('../model/Service');



const storeFeedback = async (req, res) => {
    try {
      const { id, rating } = req.body;
      console.log(id, rating);
      const product = await Service.findByIdAndUpdate(
        id,
        {
          $inc: { numberOfFeedbacks: 1 },
          $inc: { totalRating: rating}        
        },
        { new: true }
      );
      res.json(product);
    } catch (err) {
      res.status(500).json({ message: err.message });
      console.log(err.message);
    }
  };

  module.exports={storeFeedback};