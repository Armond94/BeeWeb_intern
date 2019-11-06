const router = require('express').Router();
const PositionsController = require('../controller/positions');
const controller = new PositionsController();
const { ensureAuthenticated } = require('../configs/auth');

router.get('', controller.getPosition);

router.get('', controller.getPositions);

router.post('', controller.createPosition);

router.put('', controller.changePosition);

router.delete('', controller.deletePosition);

module.exports = router;
