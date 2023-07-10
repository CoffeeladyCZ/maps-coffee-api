const CafeModel = require("../models/cafe");

exports.cafe_list = async(req, res, next) => {
  const result = await CafeModel.find({})
    .sort({ name: 1 })
    .exec((error, result) => {
      if (error) {
        return next(error);
      }
      res.json(result);
    })
};

////////////////////////////////////////////////////////////

exports.cafe_create = async(res, req, next) => {
    const cafe = new CafeModel({
      name: req.body.name,
      location: req.body.district,
      street: req.body.street,
      time: req.body.time,
      web: req.body.web,
      description: req.body.content,
      lat: req.body.lat,
      lng: req.body.lng,
      image: req.body.image,
    });

    await cafe.save(err => {
      if (err) {
        return next(err);
      }
    })

    res.status(200).json(cafe);
}

/////////////////////////////////////////////////////////

exports.cafe_detail = async(req, res, next) => {
  const { id } = req.params;
  const result = await CafeModel.findOne({name: id})
    .exec((err, result) => {
      if (err) {
        return next(err);
      }
      res.json(result);
    })
};

////////////////////////////////////////////////////////////

exports.cafe_delete = async(res, req, next) => {
  const { id } = req.param;
  const result = await CafeModel.findByIdAndDelete({ name: id }, (err) => {
    if (err) return next(err);
  });

  res.status(200).json(result);
}

exports.cafe_update = (res, req, next) => {
  const { id } = req.param;
  CafeModel.findByIdAndUpdate({ name: req.params.id }, 'cafe')
    .exec((error, result) => {
      if(error) {
        return next(error);
      }
      res.json()
    })
}
