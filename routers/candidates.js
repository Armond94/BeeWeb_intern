const router = require('express').Router();
const CandidatesController = require('../controller/candidates');
const ensureAuthenticated = require('../configs/auth');
const controller = new CandidatesController();


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
