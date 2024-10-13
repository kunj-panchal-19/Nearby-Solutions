require('dotenv').config();
const express=require('express');
const app=express();
const cors = require('cors');
const corsOptions  = require('./config/corsOptions');
const dbConnect=require('./config/dbConnect');
const Service=require('./model/Service');
const { ObjectId } = require('mongodb');


//connecting to database
dbConnect();
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/register',require('./routes/register'));

app.use('/signin',require('./routes/auth'));

app.use('/storeFeedback', require('./routes/storeFeedback'));

app.get('/services', async (req, res) => {
  const searchString = req.query.searchString;
  const longitude = parseFloat(req.query.long);
  const latitude = parseFloat(req.query.lat);
  const priceLow = parseInt(req.query.priceLow);
  const priceHigh = parseInt(req.query.priceHigh);

  try {
    
    
    const result = await Service.aggregate([
      {
        $geoNear: {
          near: { type: 'Point', coordinates: [longitude, latitude] },
          distanceField: 'distance',
          spherical: true,
          key: 'location.coordinates'
        }
      },
      {
        $match: {
          name: { $regex: searchString, $options: 'i' },
          price: { $gte: priceLow, $lte: priceHigh }
        }
      },
      {
        $project: {
          _id: 1,
          coordinates: '$location.coordinates',
          name: 1,
          price: 1,
          distance: 1
        }
      },
      {
        $sort: {
          distance: 1
        }
      }
    ]);

    res.json(result);
    console.log(result); // Log the result to check if data is coming correctly

  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    // await client.close()s;
  }
});

app.use('/logout',require('./routes/logout'));
// app.use('/community',require('./routes/community'))
app.get('/api/services/:id', async (req, res) => {
  const serviceId = new ObjectId(req.params.id);
  try {
      const service = await Service.findById(serviceId);
      if (service) {
          res.json(service);
      } else {
          res.status(404).json({ message: 'Service not found' });
      }
  } catch (error) {
      console.error('Error finding service by id:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});



app.use('/registerService',require('./routes/service'));
app.use('/registerfeedback',require('./routes/feedbackregister'));
app.use('/getallservices',require('./routes/getallservicesroute'))
app.use('/getfeedback',require('./routes/getfeedbackroute'));
app.listen(3001,()=>{
    console.log("server is runnning!!");
});