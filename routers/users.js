const router = require('express').Router();
const UsersController = require('../controller/users');
const UserValidation = require('../validations/user_validations');
const ensureAuthenticated = require('../configs/auth');
const UserPermissions = require('../validations/user_permissions');
const permission = new UserPermissions;
const controller = new UsersController();
const validation = new UserValidation();

// find user by id
router.get('/:id', ensureAuthenticated, controller.getUser);

//find all users
router.get('/', ensureAuthenticated, controller.getUsers);

// all users that have addBenefit(s)
router.get('/benefits/exists', ensureAuthenticated, controller.usersBenefits);

// signup
router.post('/register', validation.checkForRegister, controller.register);

// signin
router.post('/login', validation.chekForLogin, controller.login);

// change user
router.put('/:id', ensureAuthenticated, controller.changeUser);

// delete  user
router.delete('/:id', ensureAuthenticated, controller.deleteUser);

module.exports = router;
