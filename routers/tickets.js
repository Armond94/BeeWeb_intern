const router = require('express').Router();
const TicketsController = require('../controller/tickets');
const ensureAuthenticated = require('../configs/auth');
const controller = new TicketsController();

// find ticket
router.get('/:id', controller.getTicket);

// all tickets
router.get('/', controller.getTickets);

// create ticket
router.post('/create', controller.createTicket);

// change ticket
router.put('/:id', controller.changeTicket);

// delete  ticket
router.delete('/:id', controller.deleteTicket);

module.exports = router;
