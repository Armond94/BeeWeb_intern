import express from 'express';
import CandidatesController from '../controller/candidates';
import ensureAuthenticated from '../configs/auth';
const controller = new CandidatesController();
const router = express.Router();


//get candidate
router.get('/:id', ensureAuthenticated, controller.getCandidate);

//get candidates
router.get('', ensureAuthenticated, controller.getCandidates);

//create candidate
router.post('', controller.createCandidate);

//change candidate
router.put('/:id', ensureAuthenticated, controller.changeCandidate);

//delete candidate
router.delete('/:id', ensureAuthenticated, controller.deleteCandidate);

module.exports = router;
