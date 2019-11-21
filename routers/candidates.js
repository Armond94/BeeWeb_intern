import express from 'express';
import CandidatesController from '../controller/candidates';
import ensureAuthenticated from '../configs/auth';
import Validations from '../validations/validations';
import UserPermissions from '../validations/user_permissions';
const router = express.Router();
const controller = new CandidatesController();
const permission = new UserPermissions();
const validation = new Validations();

//get candidate
router.get('/:id', ensureAuthenticated, permission.isAdmin, controller.getCandidate);

//get candidates
router.get('', ensureAuthenticated, permission.isAdmin, controller.getCandidates);

//create candidate
router.post('', validation.checkCandidate, controller.createCandidate);

//change candidate
router.put('/:id', ensureAuthenticated, permission.isAdmin, controller.changeCandidate);

//delete candidate
router.delete('/:id', ensureAuthenticated, permission.isAdmin, controller.deleteCandidate);

export default router;
