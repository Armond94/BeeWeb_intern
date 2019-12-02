import express from 'express';
import Controller from '../controller/positions';
import CheckPermission from '../validations/user_permissions';
import Validation  from '../validations/validations';
import Auth from '../configs/auth';
const auth = new Auth();
const router = express.Router();
const controller = new Controller();
const checkPermission = new CheckPermission();
const validation = new Validation();

//get position by id
router.get('/:id', controller.getPosition);

//get all positions
router.get('', controller.getPositions);

//create position
router.post('', auth.checkToken, checkPermission.isAdmin, validation.checkPosition, controller.createPosition);

//change position
router.put('', auth.checkToken, checkPermission.isAdmin, controller.updatePosition);

//delete position
router.delete('', auth.checkToken, checkPermission.isAdmin, controller.deletePosition);

export default router;
