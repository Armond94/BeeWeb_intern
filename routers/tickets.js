import express from 'express';
import ensureAuthenticated from '../configs/auth';
import Controller from '../controller/tickets';
import Permission from '../validations/user_permissions';
import Validation  from '../validations/validations'
const router = express.Router();
const controller = new Controller();
const permission = new Permission();
const validation = new Validation();

// find ticket
router.get('/:id', ensureAuthenticated, controller.getTicket);
/**
 * @swagger
 * /tickets/:id:
 *   get:
 *     tags:
 *       - Tickets
 *     name: Find ticket
 *     summary: Find a ticket by id
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
 *         description: A single ticket object
 *       '400':
 *         description: No auth token / no ticket found in db with that id
 */

// all tickets
router.get('/', ensureAuthenticated, permission.isAdmin, controller.getTickets);
/**
 * @swagger
 * /tickets:
 *   get:
 *     tags:
 *       - Tickets
 *     name: Find tickets
 *     summary: Find ticket
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Array of ticket object
 *       '400':
 *         description: No auth token / no ticket found in db
 */

// create ticket
router.post('/create', ensureAuthenticated, validation.checkTicket, controller.createTicket);
/**
 * @swagger
 * /Tickets/create:
 *   post:
 *     tags:
 *       - Tickets
 *     name: create ticket
 *     summary: create a new tickets
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
 *             userId:
 *               type: string
 *             startDate:
 *               type: string
 *             endDate:
 *               type: string
 *             confirmed:
 *               type: boolean
 *         required:
 *           - userId
 *           - startDate
 *           - endDate
 *           - confirmed
 *     responses:
 *       '200':
 *         description: ticket created
 *       '403':
 *         description: ticket not created
 */

// change ticket
router.put('/:id', ensureAuthenticated, permission.isAdmin, controller.updateTicket);
/**
 * @swagger
 * /tickets/:id:
 *   put:
 *     tags:
 *       - Tickets
 *     name: Update ticket
 *     summary: Update ticket data
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
 *             userId:
 *               type: string
 *             startDate:
 *               type: string
 *             endDate:
 *               type: string
 *             confirmed:
 *               type: boolean
 *         required:
 *           - id
 *     responses:
 *       '200':
 *         description: ticket data updated
 *       '403':
 *         description: No authorization / ticket not found
 */

// delete  ticket
router.delete('/:id', ensureAuthenticated, permission.isAdmin, controller.deleteTicket);
/**
 * @swagger
 * /tickets/:id:
 *   delete:
 *     tags:
 *       - Tickets
 *     name: Delete ticket
 *     summary: Delete ticket by id
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
 *         description: ticket successfully deleted
 *       '404':
 *         description: No ticket in db with that id
 */

export default router;
