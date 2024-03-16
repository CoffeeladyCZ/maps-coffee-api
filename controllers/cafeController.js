const Cafe = require("../models/CafeModel");

exports.cafe_list = async (req, res, next) => {
  try {
    const result = await Cafe.find({}).sort({ name: 1 }).exec();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

exports.cafe_create = async (req, res, next) => {
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
  
  try {
    const savedCafe = await cafe.save({ writeConcern: { w: 'majority', wtimeout: 0 } });
    return res.status(201).json(savedCafe);
  } catch (err) {
    next(err);
  }
};

exports.cafe_detail = async(req, res, next) => {
  const { id } = req.params;
  
  try {
    const result = await Cafe.findOne({ slug: id }).exec();
    if (!result) {
      return res.status(404).json({ message: 'Cafe not found' });
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.cafe_delete = async(res, req, next) => {
  const { id } = req.params;
  const result = await Cafe.findByIdAndDelete({ slug: id }, (err) => {
    if (err) return next(err);
  });

  res.status(200).json(result);
}

exports.cafe_update = async (req, res, next) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const cafe = await Cafe.findOneAndUpdate({ slug: id }, updateData, { new: true });

    if (!cafe) {
      return res.status(404).json({ message: 'Cafe not found' });
    }
    return res.status(200).json({ message: 'Cafe was successfully update', updatedCafe: cafe });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Chyba při aktualizaci kavárny' });
  }
}
