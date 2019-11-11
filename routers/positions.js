import express from 'express';
import PositionsController from '../controller/positions';
import ensureAuthenticated from '../configs/auth';
const router = express.Router();
const controller = new PositionsController();

//get position by id
router.get('/:id', controller.getPosition);

//get all positions
router.get('', controller.getPositions);

//create position
router.post('', ensureAuthenticated, controller.createPosition);

//change position
router.put('', ensureAuthenticated, controller.changePosition);

//delete position
router.delete('', ensureAuthenticated, controller.deletePosition);

// export default router;
module.exports = router;
