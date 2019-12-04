import express from 'express';
import Auth from '../configs/auth';
import multipart from 'connect-multiparty';
import UsersController from '../controller/users';
import Validations from '../validations/validations';
import CheckPermissions from '../validations/user_permissions';
const auth = new Auth();
const router = express.Router();
const multipartMiddleware = multipart();
const validation = new Validations();
const controller = new UsersController();
const checkPermission = new CheckPermissions();

// get current user
router.get('/me', auth.checkToken, controller.getCurrentUser);

// find user by id
router.get('/:id', controller.getUser);

// find users
router.get('/', auth.checkToken, checkPermission.isAdmin, controller.getUsers);

// all users that have benefit(s)
router.get('/benefits/exists', auth.checkToken, checkPermission.isAdmin, controller.usersBenefits);

//find user benefits
router.get('/benefits/:id', auth.checkToken, controller.userBenefits);

// signup
router.post('/register', validation.checkForRegister, controller.register);//auth.checkToken, checkPermission.isAdmin, 

// signin
router.post('/login', validation.checkForLogin, controller.login);

//refresh token
router.post('/token', auth.checkRefreshToken, controller.refreshToken);

// change user
router.put('/:id', auth.checkToken, checkPermission.chekUpdateStaff, controller.updateUser);

//rate user
router.put('/rate/:id', auth.checkToken, checkPermission.isAdmin, controller.rateUser);

// upload photo
// router.post('/upload/avatar/:id', auth.checkToken, multipartMiddleware, controller.upload);,

// delete  user
router.delete('/:id', auth.checkToken, checkPermission.isAdmin, controller.deleteUser);

export default router;
