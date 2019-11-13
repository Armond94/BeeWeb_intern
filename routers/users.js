const router = require('express').Router();
const UsersController = require('../controller/users');
const UserValidation = require('../validations/user_validations');
const ensureAuthenticated = require('../configs/auth');
const controller = new UsersController();
const validation = new UserValidation();

// find user by id
router.get('/:id', controller.getUser);

//find all users
router.get('/', controller.getUsers);

// all users that have addBenefit(s)
router.get('/benefits/exists', controller.usersBenefits);

// signup
router.post('/register', validation.checkForRegister, controller.register);

// signin
router.post('/login', validation.chekForLogin, controller.login);

// change user
router.put('/:id', controller.changeUser);

// delete  user
router.delete('/:id', controller.deleteUser);

module.exports = router;
