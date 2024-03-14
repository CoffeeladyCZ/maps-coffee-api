// const slugify = require('slugify');

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
  try {
    const {
      name,
      contact,
      location,
      address,
      opening_hours,
      description,
      coordinates,
      image,
    } = req.body;

    const slug = slugify(name, {
      replacement: '-',
      lower: true
    });

    // for (const oh of openingHours) {
    //   if (!isValidTime(oh.timeOpen) || !isValidTime(oh.timeClose)) {
    //     return res.status(400).json({ error: 'Neplatný časový formát.' });
    //   }
    // }

    const cafe = new Cafe({
      name,
      location,
      address,
      opening_hours,
      description,
      coordinates,
      contact,
      image,
      slug,
    });

    const savedCafe = await cafe.save({ writeConcern: { w: 'majority', wtimeout: 0 } });
    return res.status(201).json(savedCafe);
  } catch (err) {
    next(err);
    // return res.status(500).json({ error: 'Něco se pokazilo.' });
  }
};

function isValidTime(time) {
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  return timeRegex.test(time);
}

/////////////////////////////////////////////////////////

exports.cafe_detail = async(req, res, next) => {
  const { id } = req.params;
  try {
    const result = await Cafe.findOne({ slug: id }).exec();
    if (!result) {
      return res.status(404).json({ message: "Cafe not found" });
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
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
  Cafe.findByIdAndUpdate({ name: req.params.id }, 'cafe')
    .exec((error, result) => {
      if(error) {
        return next(error);
      }
      res.json()
    })
}
