const router = require('express').Router();
const ensureAuthenticated = require('../configs/auth');
const UsersController = require('../controller/users');
const Validations = require('../validations/validations');
const UserPermissions = require('../validations/user_permissions');
const controller = new UsersController();
const permission = new UserPermissions();
const validation = new Validations();

//get same user
router.get('/me', ensureAuthenticated, controller.getSameUser);

// find user by id
router.get('/:id', ensureAuthenticated, permission.isAdmin, controller.getUser);

//find all users
router.get('/', ensureAuthenticated, permission.isAdmin, controller.getUsers);

// all users that have benefit(s)
router.get('/benefits/exists', ensureAuthenticated, permission.isAdmin, controller.usersBenefits);

//find user benefits
router.get('/benefits/:id', ensureAuthenticated, controller.userBenefits);

// signup
router.post('/register', ensureAuthenticated, permission.isAdmin, validation.checkForRegister, controller.register);

// signin
router.post('/login', validation.checkForLogin, controller.login);

// change user
router.put('/:id', ensureAuthenticated, permission.chekUpdateStaff, controller.updateUser);

// delete  user
router.delete('/:id', ensureAuthenticated, permission.isAdmin, controller.deleteUser);

module.exports = router;
