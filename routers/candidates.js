import express from 'express';
import CandidatesController from '../controller/candidates';
import Validations from '../validations/validations';
import CheckPermission from '../validations/user_permissions';
import Auth from '../configs/auth';
const auth = new Auth();
const router = express.Router();
const controller = new CandidatesController();
const checkPermission = new CheckPermission();
const validation = new Validations();

//get candidate
router.get('/:id', auth.checkToken, checkPermission.isAdmin, controller.getCandidate);

//get candidates
router.get('', auth.checkToken, checkPermission.isAdmin, controller.getCandidates);

//create candidate
router.post('', validation.checkCandidate, controller.createCandidate);

//change candidate
router.put('/:id', auth.checkToken, checkPermission.isAdmin, controller.changeCandidate);

//delete candidate
router.delete('/:id', auth.checkToken, checkPermission.isAdmin, controller.deleteCandidate);

export default router;
