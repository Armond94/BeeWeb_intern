import express from 'express';
import BenefitsController from '../controller/benefits';
import ensureAuthenticated from '../configs/auth';
import UserPermissions from '../validations/user_permissions';
import Validations from '../validations/validations';
const router = express.Router();
const validation = new Validations();
const permission = new UserPermissions();
const controller = new BenefitsController();

//get benefit history swagger
router.get('/users/histories/:id', ensureAuthenticated, permission.isAdmin, controller.benefitsHistory);

//get benefit by id
router.get('/:id', ensureAuthenticated, controller.getBenefit);

//find benefits
router.get('', ensureAuthenticated, permission.isAdmin, controller.getBenefits);

//create benefit
router.post('', ensureAuthenticated, validation.checkBenefitValidation, permission.isAdmin, controller.createBenefit);

// give benefit to user
router.post('/user', ensureAuthenticated, permission.isAdmin, controller.addBenefit);

//change benefit
router.put('/:id', ensureAuthenticated, permission.isAdmin, controller.updateBenefit);

//delete benefit
router.delete('/:id', ensureAuthenticated, permission.isAdmin, controller.deleteBenefit);

export default router;
