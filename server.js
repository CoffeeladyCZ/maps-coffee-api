const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');
const app = express();

const cafeRouter = require('./routes/api/cafe');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/api/cafe', cafeRouter);

// Set up mongoose connection
const mongoose = require("mongoose");

const mongoDB = process.env.MONGODB_URL;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// catch 404 and forward to error handler
// app.use((req, res, next) => {
//   next(createError(404));
// });

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
