//get current user
/**
 * @swagger
 * /users/me:
 *   get:
 *     tags:
 *       - Users
 *     name: Find current user
 *     summary: Find current user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A single user object
 *       '400':
 *         description: No auth token / no user found in db with that id
 */

// find user by id
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
 *     parameters:
 *       - in: query
 *         name: limit, offset, age
 *         schema:
 *           type: string
 *         required:
 *           - limit, offset
 *     responses:
 *       '200':
 *         description: Array of users object and all users count
 *       '400':
 *         description: No auth token / no user found in db
 */

// all users that have benefit(s)
/**
 * @swagger
 * /users/benefits/exists:
 *   get:
 *     tags:
 *       - Users
 *     name: Find users that have benefits
 *     summary: Find all users that have benefits
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Array of users object
 *       '400':
 *         description: No auth token / no user found in db with that id
 */

//find user benefits
/**
 * @swagger
 * /users/benefits/:id:
 *   get:
 *     tags:
 *       - Users
 *     name: Find user benefits
 *     summary: Find a user benefits by user id
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
 *         description: benefits objects
 *       '400':
 *         description: No auth token / no benefits found in db with that id
 */

// signup
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
 *         description: successfully registered
 *       '403':
 *         description: email already exists
 */

// signin
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
 *         description: successfully logged in
 *       '401':
 *         description: login failed
 */

 // refresh token
 /**
  * @swagger
  * /users/token:
  *   post:
  *     tags:
  *       - Users
  *     name: token
  *     summary: refresh token
  *     produces:
  *       - application/json
  *     consumes:
  *       - application/json
  *     parameters:
  *       - name: body
  *         in: body
  *         schema:
  *           type: String
  *           properties:
  *             refreshToken:
  *               type: string
  *         required:
  *           - refreshToken
  *     responses:
  *       '200':
  *         description: token successfully refreshed
  *       '401':
  *         description: refresh token not exists
  */

// update user
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

//rate user
 /**
  * @swagger
  * /users/rate/:id:
  *   put:
  *     tags:
  *       - Users
  *     name: Rate User
  *     summary: rate user
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
  *             rating:
  *               type: string
  *         required:
  *           - id
  *     responses:
  *       '200':
  *         description: successfully rate user
  *       '403':
  *         description: No authorization / user not found
  */


// delete  user
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
 *         description: No user in db with that id
 */
