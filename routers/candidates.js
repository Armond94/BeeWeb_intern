import express from 'express';
import CandidatesController from '../controller/candidates';
import ensureAuthenticated from '../configs/auth';
import Validations from '../validations/validations';
import CheckPermission from '../validations/user_permissions';
const router = express.Router();
const controller = new CandidatesController();
const checkPermission = new CheckPermission();
const validation = new Validations();

//get candidate
router.get('/:id', ensureAuthenticated, checkPermission.isAdmin, controller.getCandidate);

//get candidates
router.get('', ensureAuthenticated, checkPermission.isAdmin, controller.getCandidates);

//create candidate
router.post('', validation.checkCandidate, controller.createCandidate);

//change candidate
router.put('/:id', ensureAuthenticated, checkPermission.isAdmin, controller.changeCandidate);

//delete candidate
router.delete('/:id', ensureAuthenticated, checkPermission.isAdmin, controller.deleteCandidate);

export default router;
