const express = require('express');
const router = express.Router();

const location_controller = require('../../controllers/locationController');

router.get('/', location_controller.location_list);

module.exports = router;
