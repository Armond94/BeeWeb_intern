const router = require('express').Router();
const ensureAuthenticated = require('../configs/auth');
const controller = new (require('../controller/tickets'));
const permission = new (require('../validations/user_permissions'));
const validation = new (require('../validations/validations'));

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

module.exports = router;
