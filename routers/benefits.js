import express from 'express';
import Auth from '../configs/auth';
import Validations from '../validations/validations';
import BenefitsController from '../controller/benefits';
import CheckPermission from '../validations/user_permissions';
const auth = new Auth();
const router = express.Router();
const validation = new Validations();
const checkPermission = new CheckPermission();
const controller = new BenefitsController();

//get benefit by id
router.get('/:id', auth.checkToken, controller.getBenefit);

//find benefits
router.get('', auth.checkToken, checkPermission.isAdmin, controller.getBenefits);

//create benefit
router.post('', auth.checkToken, validation.checkBenefitValidation, checkPermission.isAdmin, controller.createBenefit);

//change benefit
router.put('/:id', auth.checkToken, checkPermission.isAdmin, controller.updateBenefit);

//delete benefit
router.delete('/:id', auth.checkToken, checkPermission.isAdmin, controller.deleteBenefit);

export default router;
