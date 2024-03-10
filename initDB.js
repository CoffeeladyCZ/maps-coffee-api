require('dotenv').config();

const mongoose = require('mongoose');
const Cafe = require('./models/CafeModel');
const Locations = require('./models/LocationModel');

const initDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await Cafe.createCollection();
    await Locations.createCollection();

    console.log('Collections created successfully');
  } catch (error) {
    console.error('Error initializing the database:', error);
  } finally {
    mongoose.disconnect();
  }
};

initDB();
