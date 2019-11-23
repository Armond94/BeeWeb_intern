import express from 'express';
import BenefitsController from '../controller/benefits';
import ensureAuthenticated from '../configs/auth';
import UserPermissions from '../validations/user_permissions';
import Validations from '../validations/validations';
const router = express.Router();
const validation = new Validations();
const permission = new UserPermissions();
const controller = new BenefitsController();

//get benefit by id
router.get('/:id', ensureAuthenticated, controller.getBenefit);
/**
 * @swagger
 * /benefits/:id:
 *   get:
 *     tags:
 *       - Benefits
 *     name: Find benefit by id
 *     summary: Find a benefit r by id
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

//get benefits
router.get('', ensureAuthenticated, permission.isAdmin, controller.getBenefits);
/**
 * @swagger
 * /benefits:
 *   get:
 *     tags:
 *       - Benefits
 *     name: Find benefits
 *     summary: Find benefits
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Array of benefits object
 *       '400':
 *         description: No auth token / no benefits found in db
 */
//create benefit

//create benefit
router.post('', ensureAuthenticated, validation.checkBenefitValidation, permission.isAdmin, controller.createBenefit);
/**
 * @swagger
 * /Benefits:
 *   post:
 *     tags:
 *       - Benefits
 *     name: create
 *     summary: create new benefit
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
 *             title:
 *               type: string
 *             description:
 *               type: string
 *         required:
 *           - title
 *           - description
 *     responses:
 *       '200':
 *         description: benefit created
 *       '403':
 *         description:  benefit not created
 */

// give benefit to user
router.post('/user', ensureAuthenticated, permission.isAdmin, controller.addBenefit);
/**
 * @swagger
 * /benefits/user:
 *   post:
 *     tags:
 *       - Benefits
 *     name: add
 *     summary: give benefit to user
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
 *             title:
 *               type: string
 *             description:
 *               type: string
 *         required:
 *           - title
 *           - description
 *     responses:
 *       '200':
 *         description: benefit successfully added
 *       '401':
 *         description: benefit not added
 */

//change benefit
router.put('/:id', ensureAuthenticated, permission.isAdmin, controller.updateBenefit);
/**
 * @swagger
 * /benefits/:id:
 *   put:
 *     tags:
 *       - Benefits
 *     name: Update benefits
 *     summary: benefits user data
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
 *             title:
 *               type: string
 *             description:
 *               type: string
 *         required:
 *           - username
 *     responses:
 *       '200':
 *         description: benefit data updated
 *       '403':
 *         description: No authorization / benefit not found
 */

//delete benefit
router.delete('/:id', ensureAuthenticated, permission.isAdmin, controller.deleteBenefit);
/**
 * @swagger
 * /benefits/:id:
 *   delete:
 *     tags:
 *       - Benefits
 *     name: Delete benefits
 *     summary: Delete benefits
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
 *         description: benefit successfully deleted
 *       '404':
 *         description: No benefit in db with that id
 */

export default router;
