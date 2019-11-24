import express from 'express';
import ensureAuthenticated from '../configs/auth';
import UsersController from '../controller/users';
import Validations from '../validations/validations';
import UserPermissions from '../validations/user_permissions';
const router = express.Router();
const controller = new UsersController();
const permission = new UserPermissions();
const validation = new Validations();

//get same user
router.get('/me', ensureAuthenticated, controller.getSameUser);
/**
 * @swagger
 * /users/me:
 *   get:
 *     tags:
 *       - Users
 *     name: Find same user
 *     summary: Find same user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A single user object
 *       '400':
 *         description: No auth token / no user found in db with that id
 */

// find user by id
router.get('/:id', ensureAuthenticated, permission.isAdmin, controller.getUser);
/**
 * @swagger
 * /users/:id:
 *   get:
 *     tags:
 *       - Users
 *     name: Find user by id
 *     summary: Find a user by id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: params
 *         name: id
 *         schema:
 *           type: string
 *         required:
 *           - id
 *     responses:
 *       '200':
 *         description: A single user object
 *       '400':
 *         description: No auth token / no user found in db with that id
 */

//find users
router.get('/', ensureAuthenticated, permission.isAdmin, controller.getUsers);
/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - Users
 *     name: Find users
 *     summary: Find users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Array of users object
 *       '400':
 *         description: No auth token / no user found in db
 */

// all users that have benefit(s)
router.get('/benefits/exists', ensureAuthenticated, permission.isAdmin, controller.usersBenefits);
/**
 * @swagger
 * /users/benefits/exists:
 *   get:
 *     tags:
 *       - Users
 *     name: Find users that have benefits
 *     summary: Find a users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Array of users object
 *       '400':
 *         description: No auth token / no user found in db with that id
 */

//find user benefits
router.get('/benefits/:id', ensureAuthenticated, controller.userBenefits);
/**
 * @swagger
 * /users/benefits/:id:
 *   get:
 *     tags:
 *       - Users
 *     name: Find user benefit
 *     summary: Find a user benefit by id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: params
 *         name: id
 *         schema:
 *           type: string
 *         required:
 *           - id
 *     responses:
 *       '200':
 *         description: A single benefit object
 *       '400':
 *         description: No auth token / no benefit found in db with that id
 */

// signup
router.post('/register', ensureAuthenticated, permission.isAdmin, validation.checkForRegister, controller.register);
/**
 * @swagger
 * /users/register:
 *   post:
 *     tags:
 *       - Users
 *     name: Register
 *     summary: Register a new user
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             firstName:
 *               type: string
 *             lastName:
 *               type: string
 *             role:
 *               type: string
 *             email:
 *               type: string
 *             birthday:
 *               type: string
 *             phoneNumber:
 *               type: number
 *             password:
 *               type: string
 *               format: password
 *             repeatPassword:
 *               type: string
 *               format: password
 *         required:
 *           - firstName
 *           - lastName
 *           - role
 *           - email
 *           - birthday
 *           - phoneNumber
 *           - password
 *           - repeatpassword
 *     responses:
 *       '200':
 *         description: User created
 *       '403':
 *         description: Username or email already taken
 */

// signin
router.post('/login', validation.checkForLogin, controller.login);
/**
 * @swagger
 * /users/login:
 *   post:
 *     tags:
 *       - Users
 *     name: Login
 *     summary: Logs in a user
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *               format: password
 *         required:
 *           - email
 *           - password
 *     responses:
 *       '200':
 *         description: User found and logged in successfully
 *       '401':
 *         description: Bad username, not found in db
 */

// change user
router.put('/:id', ensureAuthenticated, permission.chekUpdateStaff, controller.updateUser);
/**
 * @swagger
 * /users/:id:
 *   put:
 *     tags:
 *       - Users
 *     name: Update User
 *     summary: Update user data
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             firstName:
 *               type: string
 *             lastName:
 *               type: string
 *             email:
 *               type: string
 *             role:
 *               type: string
 *             birthday:
 *               type: string
 *             phoneNumber:
 *               type: string
 *             password:
 *               type: string
 *             repeatPassword:
 *               type: string
 *         required:
 *           - id
 *     responses:
 *       '200':
 *         description: User data updated
 *       '403':
 *         description: No authorization / user not found
 */

// delete  user
router.delete('/:id', ensureAuthenticated, permission.isAdmin, controller.deleteUser);
/**
 * @swagger
 * /users/:id:
 *   delete:
 *     tags:
 *       - Users
 *     name: Delete User
 *     summary: Delete user
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: params
 *         schema:
 *           type: string
 *         required:
 *           - id
 *     responses:
 *       '200':
 *         description: User successfully deleted
 *       '404':
 *         description: No user in db with that name
 */

export default router;
