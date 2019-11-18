const router = require('express').Router();
const ensureAuthenticated = require('../configs/auth');
const controller = new (require('../controller/positions'));
const permission = new (require('../validations/user_permissions'));
const validation = new (require('../validations/validations'));


//get position by id
router.get('/:id', controller.getPosition);

//get all positions
router.get('', controller.getPositions);

//create position
router.post('', ensureAuthenticated, permission.isAdmin, validation.checkPosition, controller.createPosition);

//change position
router.put('', ensureAuthenticated, permission.isAdmin, controller.updatePosition);

//delete position
router.delete('', ensureAuthenticated, permission.isAdmin, controller.deletePosition);

// export default router;
module.exports = router;
