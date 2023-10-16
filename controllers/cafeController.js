const Cafe = require("../models/CafeModel");

exports.cafe_list = async(req, res, next) => {
  const result = await Cafe.find({})
    .sort({ name: 1 })
    .exec((error, result) => {
      if (error) {
        return next(error);
      }
      res.json(result);
    })
};

////////////////////////////////////////////////////////////

exports.cafe_create = async (req, res, next) => {
  console.log('request', req.body);
  try {
    const {
      name,
      location,
      street,
      city,
      postCode,
      time,
      web,
      description,
      lat,
      lng,
      image,
    } = req.body;

    const cafe = new Cafe({
      name,
      location,
      street,
      city,
      postCode,
      time,
      web,
      description,
      lat,
      lng,
      image,
    });

    const savedCafe = await cafe.save({ writeConcern: { w: 'majority', wtimeout: 0 } });
    res.status(201).json(savedCafe);
  } catch (err) {
    next(err);
  }
};

/////////////////////////////////////////////////////////

exports.cafe_detail = async(req, res, next) => {
  const { id } = req.params;
  const result = await Cafe.findOne({name: id})
    .exec((err, result) => {
      if (err) {
        return next(err);
      }
      res.json(result);
    })
};

////////////////////////////////////////////////////////////

exports.cafe_delete = async(res, req, next) => {
  const { id } = req.params;
  const result = await Cafe.findByIdAndDelete({ name: id }, (err) => {
    if (err) return next(err);
  });

  res.status(200).json(result);
}

exports.cafe_update = (res, req, next) => {
  const { id } = req.params;
  Cafe.findByIdAndUpdate({ name: req.params.id }, 'cafe')
    .exec((error, result) => {
      if(error) {
        return next(error);
      }
      res.json()
    })
}
