const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LocationsSchema = new Schema({
  locations: {
    type: Array,
    required: true,
  }
});

LocationsSchema.virtual('url').get(function () {
  return 'api/locations/' + this._id;
});

// Export model
module.exports = mongoose.model('Locations', LocationsSchema);