const router = require('express').Router();
const BenefitsController = require('../controller/benefits');
const controller = new BenefitsController();
const { ensureAuthenticated } = require('../configs/auth');

//get benefit
router.get('/:id', controller.getBenefit);

//get benefits
router.get('', controller.getBenefits);

//create benefit
router.post('', controller.createBenefit);

// give benefit to user
router.post('/user', controller.addBenefit);

//change benefit
router.put('/:id', controller.changeBenefit);

//delete benefit
router.delete('/:id', controller.deleteBenefit);

module.exports = router;
