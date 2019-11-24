import express from 'express';
import ensureAuthenticated from '../configs/auth';
import Controller from '../controller/positions';
import Permission from '../validations/user_permissions';
import Validation  from '../validations/validations'
const router = express.Router();
const controller = new Controller();
const permission = new Permission();
const validation = new Validation();


//get position by id
router.get('/:id', controller.getPosition);
/**
 * @swagger
 * /positions/:id:
 *   get:
 *     tags:
 *       - Positions
 *     name: Find positions by id
 *     summary: Find a positions by id
 *     parameters:
 *       - in: params
 *         name: id
 *         schema:
 *           type: string
 *         required:
 *           - id
 *     responses:
 *       '200':
 *         description: A single positions object
 *       '400':
 *         description:no positions found in db with that id
 */

//get all positions
router.get('', controller.getPositions);
/**
 * @swagger
 * /positions:
 *   get:
 *     tags:
 *       - Positions
 *     name: Find positions
 *     summary: Find positions by id
 *     responses:
 *       '200':
 *         description: Array of positions object
 *       '400':
 *         description:no positions found in db
 */

//create position
router.post('', controller.createPosition);//ensureAuthenticated, permission.isAdmin, validation.checkPosition,
/**
 * @swagger
 * /positions:
 *   post:
 *     tags:
 *       - Positions
 *     name: create position
 *     summary: create new positions object
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
 *             type:
 *               type: string
 *             required_qualifications:
 *               type: string
 *             deadline:
 *               type: string
 *             candidates:
 *               type: string
 *         required:
 *           - title
 *           - description
 *           - type
 *           - required_qualifications
 *           - deadline
 *     responses:
 *       '200':
 *         description: candidate created
 *       '403':
 *         description: candidate not created
 */

//change position
router.put('', ensureAuthenticated, permission.isAdmin, controller.updatePosition);
/**
 * @swagger
 * /candidates/:id:
 *   put:
 *     tags:
 *       - Candidates
 *     name: Update candidate
 *     summary: Update candidate data
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
 *             type:
 *               type: string
 *             required_qualifications:
 *               type: string
 *             deadline:
 *               type: date
 *             candidates:
 *               type: string
 *         required:
 *           - id
 *     responses:
 *       '200':
 *         description: candidates data updated
 *       '403':
 *         description: No authorization / candidates not updated
 */

//delete position
router.delete('', ensureAuthenticated, permission.isAdmin, controller.deletePosition);
/**
 * @swagger
 * /candidates/:id:
 *   delete:
 *     tags:
 *       - Candidates
 *     name: Delete candidate
 *     summary: Delete candidate by id
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
 *         description: candidate successfully deleted
 *       '404':
 *         description: No candidate in db with that id
 */

export default router;
