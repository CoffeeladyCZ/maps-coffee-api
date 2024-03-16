const express = require('express');
const router = express.Router();

const cafe_controller = require('../../controllers/cafeController');

router.get('/list', cafe_controller.cafe_list);

router.post('/create', cafe_controller.cafe_create);

router.get('/:id', cafe_controller.cafe_detail);

router.delete('/:id/', cafe_controller.cafe_delete);

router.patch('/:id/', cafe_controller.cafe_update);

module.exports = router;
