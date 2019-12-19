import express from 'express';
import Auth from '../configs/auth';
import Validations from '../validations/validations';
import CheckPermission from '../validations/user_permissions';
import BenefitHistoriesController from '../controller/benefit_histories';
const auth = new Auth();
const router = express.Router();
const validation = new Validations();
const checkPermission = new CheckPermission();
const controller = new BenefitHistoriesController();

// find benefit history
router.get('/:id', auth.checkToken, checkPermission.isAdmin, controller.getBenefitHistory);

// find benefit histories
router.get('', auth.checkToken, checkPermission.isAdmin, controller.getBenefitHistories);

// create benefit history (give benefit to user)
router.post('/user', auth.checkToken, validation.checkBenefitHistory, checkPermission.isAdmin, controller.createBenefitHistory);

// change benefit history
router.put('/:id',auth.checkToken, checkPermission.isAdmin, controller.updateBenefitHistory);

// delete benefit history
router.delete('/:id', auth.checkToken, checkPermission.isAdmin, controller.deleteBenefitHistory);

export default router;
