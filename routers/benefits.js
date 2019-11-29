import express from 'express';
import BenefitsController from '../controller/benefits';
import ensureAuthenticated from '../configs/auth';
import CheckPermission from '../validations/user_permissions';
import Validations from '../validations/validations';
const router = express.Router();
const validation = new Validations();
const checkPermission = new CheckPermission();
const controller = new BenefitsController();

//get benefit history swagger
router.get('/users/histories', ensureAuthenticated, checkPermission.isAdmin, controller.benefitsHistory);

//get benefit by id
router.get('/:id', ensureAuthenticated, controller.getBenefit);

//find benefits
router.get('', ensureAuthenticated, checkPermission.isAdmin, controller.getBenefits);

//create benefit
router.post('', ensureAuthenticated, validation.checkBenefitValidation, checkPermission.isAdmin, controller.createBenefit);

// give benefit to user
router.post('/user', ensureAuthenticated, checkPermission.isAdmin, controller.addBenefit);

//change benefit
router.put('/:id', ensureAuthenticated, checkPermission.isAdmin, controller.updateBenefit);

//delete benefit
router.delete('/:id', ensureAuthenticated, checkPermission.isAdmin, controller.deleteBenefit);

export default router;
