import express from 'express';
import CandidatesController from '../controller/candidates';
import Validations from '../validations/validations';
import CheckPermission from '../validations/user_permissions';
import Auth from '../configs/auth';
const auth = new Auth();
const router = express.Router();
const controller = new CandidatesController();
const checkPermission = new CheckPermission();
const validation = new Validations();

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
          bucketName: 'cv'
        };
        resolve(fileInfo);
      });
    });
  }
});

const upload = multer({ storage });

// get candidate cv /cv/:candidateId
router.get('/cv/:id', auth.checkToken, controller.getCV);

// delete candidate cv
router.delete('/cv/delete/:id', auth.checkToken, controller.removeCV);

//get candidate
router.get('/:id', auth.checkToken, checkPermission.isAdmin, controller.getCandidate);

//get candidates
router.get('', auth.checkToken, checkPermission.isAdmin, controller.getCandidates);

//create candidate
router.post('', upload.single('file'), controller.createCandidate);//validation.checkCandidate,

//change candidate
router.put('/:id', auth.checkToken, checkPermission.isAdmin, controller.changeCandidate);

//delete candidate
router.delete('/:id', auth.checkToken, checkPermission.isAdmin, controller.deleteCandidate);

export default router;
