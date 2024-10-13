const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
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
  services: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service'
    }
  ],
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

businessSchema.index({ location: '2dsphere' });

const Business = mongoose.model('Business', businessSchema);

module.exports = Business;
