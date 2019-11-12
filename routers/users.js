import express from 'express';
import UsersController from '../controller/users';
import ensureAuthenticated from '../configs/auth';
const controller = new UsersController();
const router = express.Router();


// find user by id
router.get('/:id', ensureAuthenticated, controller.getUser);

// all users that have addBenefit(s)
router.get('/benefits/exists', ensureAuthenticated, controller.usersBenefits);

// signup
router.post('/register', controller.register);

// signin
router.post('/login', controller.login);

// change user
router.put('/:id', ensureAuthenticated, controller.changeUser);

// delete  user
router.delete('/:id', ensureAuthenticated, controller.deleteUser);

// export default router;
module.exports = router;
