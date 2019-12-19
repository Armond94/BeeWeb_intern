import express from 'express';
import Auth from '../configs/auth';
import UsersController from '../controller/users';
import Validations from '../validations/validations';
import CheckPermissions from '../validations/user_permissions';
const auth = new Auth();
const router = express.Router();
const validation = new Validations();
const controller = new UsersController();
const checkPermission = new CheckPermissions();
import GridFsStorage from 'multer-gridfs-storage';
import crypto from'crypto';
import path from 'path';
import multer from 'multer';


const storage = new GridFsStorage({
  url: 'mongodb://localhost:27017/beeweb_intern',
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});

const upload = multer({ storage });



//get user avatar /image/avatar/:userId
router.get('/image/avatar/:id', auth.checkToken, controller.getAvatar);

//delete getAvatar
router.delete('/image/delete', auth.checkToken, controller.removeAvatar);

// get current user
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
router.post('/register', auth.checkToken, validation.checkForRegister, checkPermission.isAdmin, controller.register);

// signin
router.post('/login', validation.checkForLogin, controller.login);

// allow notification
router.post('/notification/token/:id', auth.checkToken, controller.updateUser);

// logout
router.post('/logout/:id', auth.checkToken, controller.logout);

// refresh token
router.post('/token', auth.checkRefreshToken, controller.refreshToken);

// upload avatar // /image/upload/:userId
router.post('/image/upload', auth.checkToken, upload.single('file'), controller.uploadAvatar);

// change user
router.put('/:id', auth.checkToken, checkPermission.chekUpdateStaff, controller.updateUser);

// rate user
router.put('/rate/:id', auth.checkToken, checkPermission.isAdmin, controller.rateUser);

// delete  user
router.delete('/:id', auth.checkToken, checkPermission.isAdmin, controller.deleteUser);

export default router;
