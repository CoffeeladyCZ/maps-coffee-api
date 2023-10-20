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

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());
app.use('/api/cafe', cafeRouter);

const openapiSpecification = JSON.parse(fs.readFileSync('docs/openapi.json', 'utf8'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

// Set up mongoose connection
const mongoose = require("mongoose");
const mongoDB = process.env.MONGO_URL;

const connectDB = async() => {
  try {
    await mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  } catch(error) {
    console.error('Failed to connect to MongoDB', error);
  }
}
connectDB();

if (!process.env.MONGO_URL) {
  console.error('Error: MONGO_URL not found in .env file');
  process.exit(1);
}

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });});

// CORS
app.get('/cafe/list', (req, res, next) => {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})

app.listen(80, () => {
  console.log('CORS-enabled web server listening on port 80')
})

app.use(cookieParser())


// error handler
app.use((err, req, res, next) => {
  res.status(400).send(err.message)
})

app.listen(3000)

module.exports = app;
