const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CafeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  location: { type: Array, },
  street: { type: String, },
  time: { type: String, },
  web: { type: String },
  description: { type: String, },
  lat: {
    type: Number,
    max_length: 18,
    required: true
  },
  lng: {
    type: Number,
    max_length: 18,
    required: true
  }, 
  image: { type: Array }
});

CafeSchema.virtual('url').get(() => {
  return 'api/cafe/' + this._id;
});

// Export model
module.exports = mongoose.model('Cafes', CafeSchema);
