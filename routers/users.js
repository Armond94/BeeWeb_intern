const router = require('express').Router();
const ensureAuthenticated = require('../configs/auth');
const UsersController = require('../controller/users');
const UserValidation = require('../validations/user_validations');
const UserPermissions = require('../validations/user_permissions');
const controller = new UsersController();
const permission = new UserPermissions();
const validation = new UserValidation();

// find user by id
router.get('/:id', ensureAuthenticated, permission.isStaff, controller.getUser);

//find all users
router.get('/', ensureAuthenticated, permission.isAdmin, controller.getUsers);

// all users that have addBenefit(s)
router.get('/benefits/exists', ensureAuthenticated, permission.isAdmin, controller.usersBenefits);

// signup
router.post('/register', validation.checkForRegister, controller.register);

// signin
router.post('/login', validation.chekForLogin, controller.login);

// change user
router.put('/:id', ensureAuthenticated, permission.isStaff, controller.changeUser);

// delete  user
router.delete('/:id', ensureAuthenticated, permission.isStaff, permission.isAdmin, controller.deleteUser);

module.exports = router;
