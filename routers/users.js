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
router.get('/:id', ensureAuthenticated, controller.getUser);

//find all users
router.get('/', ensureAuthenticated, permission.isAdmin, controller.getUsers);

// all users that have addBenefit(s)
router.get('/benefits/exists', ensureAuthenticated, permission.isAdmin, controller.usersBenefits);

// signup
router.post('/register', ensureAuthenticated, validation.checkForRegister, permission.isAdmin, controller.register);

// signin
router.post('/login', validation.checkForLogin, controller.login);

// change user
router.put('/:id', ensureAuthenticated, permission.isAdmin, controller.updateUser);

// delete  user
router.delete('/:id', ensureAuthenticated, permission.isAdmin, controller.deleteUser);

module.exports = router;
