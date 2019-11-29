import express from 'express';
import ensureAuthenticated from '../configs/auth';
import Controller from '../controller/positions';
import CheckPermission from '../validations/user_permissions';
import Validation  from '../validations/validations'
const router = express.Router();
const controller = new Controller();
const checkPermission = new CheckPermission();
const validation = new Validation();

//get position by id
router.get('/:id', controller.getPosition);

//get all positions
router.get('', controller.getPositions);

//create position
router.post('',ensureAuthenticated, checkPermission.isAdmin, validation.checkPosition, controller.createPosition);

//change position
router.put('', ensureAuthenticated, checkPermission.isAdmin, controller.updatePosition);

//delete position
router.delete('', ensureAuthenticated, checkPermission.isAdmin, controller.deletePosition);

export default router;
