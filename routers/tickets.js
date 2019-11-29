import express from 'express';
import ensureAuthenticated from '../configs/auth';
import Controller from '../controller/tickets';
import CheckPermission from '../validations/user_permissions';
import Validation  from '../validations/validations'
const router = express.Router();
const controller = new Controller();
const checkPermission = new CheckPermission();
const validation = new Validation();

// find ticket
router.get('/:id', ensureAuthenticated, controller.getTicket);

// all tickets
router.get('/', ensureAuthenticated, checkPermission.isAdmin, controller.getTickets);

// create ticket
router.post('/create', ensureAuthenticated, validation.checkTicket, controller.createTicket);

// change ticket
router.put('/:id', ensureAuthenticated, checkPermission.isAdmin, controller.updateTicket);

// delete  ticket
router.delete('/:id', ensureAuthenticated, checkPermission.isAdmin, controller.deleteTicket);

export default router;
