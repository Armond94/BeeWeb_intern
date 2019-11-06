const router = require('express').Router();
const CandidatesController = require('../controller/candidates');
const controller = new CandidatesController();
const { ensureAuthenticated } = require('../configs/auth');

router.get('', controller.getCandidate);

router.get('', controller.getCandidates);

router.post('/:id', controller.createCandidate);

router.put('', controller.changeCandidate);

router.delete('', controller.deleteCandidate);

module.exports = router;
