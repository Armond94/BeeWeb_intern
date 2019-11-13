const router = require('express').Router();
const UsersController = require('../controller/users');
const ensureAuthenticated = require('../configs/auth');
const controller = new UsersController();

// find user by id
router.get('/:id', controller.getUser);

//find all users
router.get('/', controller.getUsers);

// all users that have addBenefit(s)
router.get('/benefits/exists', controller.usersBenefits);

// signup
router.post('/register', controller.register);

// signin
router.post('/login', controller.login);

// change user
router.put('/:id', controller.changeUser);

// delete  user
router.delete('/:id', controller.deleteUser);

module.exports = router;
