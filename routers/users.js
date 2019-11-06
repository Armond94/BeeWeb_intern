const router = require('express').Router();
const passport = require('passport');
const UsersController = require('../controller/users');
const controller = new UsersController();
const { ensureAuthenticated } = require('../configs/auth');

// login page
router.get('/login', controller.loginPage);

// user register Page
router.get('/register', controller.registerPage);

// user dashboard page
router.get('/dashboard', controller.userDashboardPage);

// logout
router.get('/logout', controller.logout);

// all users that have addBenefit(s)
router.get('/benefits', controller.usersBenefits);

// findUser
router.get('/:id', controller.getUser);

// registration
router.post('/register', controller.register);

// login
router.post('/login', controller.login);

// change user
router.put('/:id', controller.changeUser);

// delete user
router.delete('/', controller.deleteUser);

module.exports = router;
