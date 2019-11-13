const router = require('express').Router();
const UsersController = require('../controller/users');
const ensureAuthenticated = require('../configs/auth');
const controller = new UsersController();

// find user by id
router.get('/:id', ensureAuthenticated, controller.getUser);

// all users that have addBenefit(s)
router.get('/benefits/exists', ensureAuthenticated, controller.usersBenefits);

// signup
router.post('/register', controller.register);

// signin
router.post('/login', controller.login);

// change user
router.put('/:id', ensureAuthenticated, controller.changeUser);

// delete  user
router.delete('/:id', ensureAuthenticated, controller.deleteUser);

// export default router;
module.exports = router;
