import express from 'express';
import BenefitsController from '../controller/benefits';
import ensureAuthenticated from '../configs/auth';
const controller = new BenefitsController();
const router = express.Router();

//get benefit by id
router.get('/:id', ensureAuthenticated, controller.getBenefit);

//get benefits
router.get('', ensureAuthenticated, controller.getBenefits);

//create benefit
router.post('', ensureAuthenticated, controller.createBenefit);

// give benefit to user
router.post('/user', ensureAuthenticated, controller.addBenefit);

//change benefit
router.put('/:id', ensureAuthenticated, controller.changeBenefit);

//delete benefit
router.delete('/:id', ensureAuthenticated, controller.deleteBenefit);

module.exports = router;
