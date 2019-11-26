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

// all tickets
router.get('/', ensureAuthenticated, permission.isAdmin, controller.getTickets);

// create ticket
router.post('/create', ensureAuthenticated, validation.checkTicket, controller.createTicket);

// change ticket
router.put('/:id', ensureAuthenticated, permission.isAdmin, controller.updateTicket);

// delete  ticket
router.delete('/:id', ensureAuthenticated, permission.isAdmin, controller.deleteTicket);

export default router;
