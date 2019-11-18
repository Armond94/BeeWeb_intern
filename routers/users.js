const router = require('express').Router();
const ensureAuthenticated = require('../configs/auth');
const UsersController = require('../controller/users');
const Validations = require('../validations/validations');
const UserPermissions = require('../validations/user_permissions');
const controller = new UsersController();
const permission = new UserPermissions();
const validation = new Validations();

// find user by id
router.get('/:id', ensureAuthenticated, permission.isStaff, controller.getUser);

//find all users
router.get('/', ensureAuthenticated, permission.isAdmin, controller.getUsers);

// all users that have addBenefit(s)
router.get('/benefits/exists', ensureAuthenticated, permission.isAdmin, controller.usersBenefits);

// signup
router.post('/register', validation.checkForRegister, controller.register);

// signin
router.post('/login', validation.checkForLogin, controller.login);

// change user
router.put('/:id', ensureAuthenticated, permission.isStaff, controller.updateUser);

// delete  user
router.delete('/:id', ensureAuthenticated, permission.isStaff, controller.deleteUser);

module.exports = router;
