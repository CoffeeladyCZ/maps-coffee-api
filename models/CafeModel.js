const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const addressSchema = new mongoose.Schema({
  street: String,
  post_code: String,
  city: String,
  location: String,
});

const coordinatesSchema = new mongoose.Schema({
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
})

const contactSchema = new mongoose.Schema({
    phone: String,
    email: String,
    web: String,
})

const openingHoursSchema = new mongoose.Schema({
  day_of_week: String,
  open_time: String,
  close_time: String,
})

const CafeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  contact: contactSchema,
  address: addressSchema,
  opening_hours: [openingHoursSchema],
  description: { type: String, },
  coordinates: coordinatesSchema,
  image: { type: Array },
  slug: { type: String },
});

CafeSchema.virtual('url').get(function () {
  return 'api/cafe/' + this._id;
});

// Export model
module.exports = mongoose.model('Cafes', CafeSchema);
