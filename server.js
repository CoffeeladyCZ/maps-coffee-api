require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');
const app = express();
const swaggerUi = require('swagger-ui-express');

const cafeRouter = require('./routes/api/cafe');
const locationRouter = require('./routes/api/locations');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());

app.use('/api/cafe', cafeRouter);
app.use('/api/locations', locationRouter);

const openapiSpecification = JSON.parse(fs.readFileSync('docs/openapi.json', 'utf8'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

// Set up mongoose connection
const mongoose = require("mongoose");
const mongoDB = process.env.MONGODB_URI;

const connectDB = async() => {
  try {
    await mongoose.connect(mongoDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      writeConcern: { w: 'majority' }
    })
  } catch(error) {
    console.error('Failed to connect to MongoDB', error);
  }
}
connectDB();

if (!process.env.MONGODB_URI) {
  console.error('Error: MONGODB_URI not found in .env file');
  process.exit(1);
}

// error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });});

app.use(cookieParser())


// error handler
app.use((err, req, res, next) => {
  res.status(400).send(err.message)
})

module.exports = app;
