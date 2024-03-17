const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
});

UserSchema.virtual('url').get(function () {
  return 'api/user/' + this._id;
});

// Export model
module.exports = mongoose.model('User', UserSchema);