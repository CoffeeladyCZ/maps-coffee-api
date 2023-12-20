const Locations = require("../models/LocationModel");

exports.location_list = async(req, res, next) => {
  try {
    const result = await Locations.find({}).exec();
    if (!result) {
      return res.status(404).json({ message: "Locations not found" });
    }
    return res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};
