const router = require('express').Router();
const CandidatesController = require('../controller/candidates');
const ensureAuthenticated = require('../configs/auth');
const controller = new CandidatesController();
const Validations = require('../validations/validations');
const UserPermissions = require('../validations/user_permissions');
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

module.exports = router;
