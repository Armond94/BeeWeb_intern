import express from 'express';
import ensureAuthenticated from '../configs/auth';
import UsersController from '../controller/users';
import Validations from '../validations/validations';
import CheckPermissions from '../validations/user_permissions';
const router = express.Router();
const controller = new UsersController();
const checkPermission = new CheckPermissions();
const validation = new Validations();

//get current user
router.get('/me', ensureAuthenticated, controller.getCurrentUser);

// find user by id
router.get('/:id', ensureAuthenticated, checkPermission.isAdmin, controller.getUser);

//find users
router.get('/', ensureAuthenticated, checkPermission.isAdmin, controller.getUsers);

// all users that have benefit(s)
router.get('/benefits/exists', ensureAuthenticated, checkPermission.isAdmin, controller.usersBenefits);

//find user benefits
router.get('/benefits/:id', ensureAuthenticated, controller.userBenefits);

// signup
router.post('/register', ensureAuthenticated, checkPermission.isAdmin, validation.checkForRegister, controller.register);

// signin
router.post('/login', validation.checkForLogin, controller.login);

// change user
router.put('/:id', ensureAuthenticated, checkPermission.chekUpdateStaff, controller.updateUser);

// delete  user
router.delete('/:id', ensureAuthenticated, checkPermission.isAdmin, controller.deleteUser);

export default router;
