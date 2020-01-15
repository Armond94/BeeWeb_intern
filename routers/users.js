import express from 'express';
import Auth from '../configs/auth';
import UploadService from '../services/upload';
import UsersController from '../controller/users';
import Validations from '../validations/validations';
import CheckPermissions from '../validations/user_permissions';

const auth = new Auth();
const router = express.Router();
const upload = new UploadService();
const validation = new Validations();
const controller = new UsersController();
const checkPermission = new CheckPermissions();

//get user avatar /image/avatar/:userId
router.get('/image/avatar/:id', auth.checkToken, controller.getAvatar);

//delete getAvatar
router.delete('/image/delete', auth.checkToken, controller.removeAvatar);

//get current user
router.get('/me', auth.checkToken, controller.getCurrentUser);

// find user by id
router.get('/:id', controller.getUser);

// find users
router.get('/', auth.checkToken, checkPermission.isAdmin, controller.getUsers);

// all users that have benefit(s)
router.get('/benefits/exists', auth.checkToken, checkPermission.isAdmin, controller.usersBenefits);

// find user benefits
router.get('/benefits/:id', auth.checkToken, controller.userBenefits);

// signup
router.post('/register', validation.checkForRegister, auth.checkToken, checkPermission.isAdmin, controller.register); 

// signin
router.post('/login', validation.checkForLogin, controller.login);

// allow notification
router.post('/notification/token/:id', auth.checkToken, controller.updateUser);

// logout
router.post('/logout/:id', auth.checkToken, controller.logout);

// refresh token
router.post('/token', auth.checkRefreshToken, controller.refreshToken);

// upload avatar /image/upload/:userId
router.post('/image/upload', auth.checkToken, upload.uploadFile('file'), controller.uploadAvatar);

// change user
router.put('/:id', auth.checkToken, checkPermission.chekUpdateStaff, controller.updateUser);

// rate user
router.put('/rate/:id', auth.checkToken, checkPermission.isAdmin, controller.rateUser);

// delete  user
router.delete('/:id', auth.checkToken, checkPermission.isAdmin, controller.deleteUser);

export default router;
