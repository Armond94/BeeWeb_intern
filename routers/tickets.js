import express from 'express';
import Controller from '../controller/tickets';
import CheckPermission from '../validations/user_permissions';
import Validation  from '../validations/validations';
import Auth from '../configs/auth';
const auth = new Auth();
const router = express.Router();
const controller = new Controller();
const checkPermission = new CheckPermission();
const validation = new Validation();

// find ticket
router.get('/:id', auth.checkToken, controller.getTicket);

// all tickets
router.get('/', auth.checkToken, checkPermission.isAdmin, controller.getTickets);

// create ticket
router.post('/create', auth.checkToken, validation.checkTicket, controller.createTicket);

// change ticket
router.put('/:id', auth.checkToken, checkPermission.isAdmin, controller.updateTicket);

// delete  ticket
router.delete('/:id', auth.checkToken, checkPermission.isAdmin, controller.deleteTicket);

export default router;
