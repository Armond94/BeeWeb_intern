import express from 'express';
import UsersController from '../controller/users';
import ensureAuthenticated from '../configs/auth';
const controller = new UsersController();
const router = express.Router();

// redirect login page
router.get('/login', controller.loginPage);

// user redirect register Page
router.get('/register', controller.registerPage);

// find user by id
router.get('/:id', ensureAuthenticated, controller.getUser);

// user redirect dashboard page
router.get('/dashboard', ensureAuthenticated, controller.userDashboardPage);

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
