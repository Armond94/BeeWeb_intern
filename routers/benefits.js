const router = require('express').Router();
const BenefitsController = require('../controller/benefits');
const ensureAuthenticated = require('../configs/auth');
const UserPermissions = require('../validations/user_permissions');
const Validations = require('../validations/validations');
const validation = new Validations();
const permission = new UserPermissions();
const controller = new BenefitsController();

//get benefit by id
router.get('/:id', ensureAuthenticated, permission.isStaff, controller.getBenefit);

//get benefits
router.get('', ensureAuthenticated, permission.isAdmin, controller.getBenefits);

//create benefit
router.post('', ensureAuthenticated, validation.checkBenefitValidation, permission.isAdmin, controller.createBenefit);

// give benefit to user
router.post('/user', ensureAuthenticated, permission.isAdmin, controller.addBenefit);

//change benefit
router.put('/:id', ensureAuthenticated, permission.isAdmin, controller.updateBenefit);

//delete benefit
router.delete('/:id', ensureAuthenticated, permission.isAdmin, controller.deleteBenefit);

module.exports = router;
