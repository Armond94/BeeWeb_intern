import Errors from '../errors';
import Queries from '../helpers/generateQuery';

export default class TicketsController {

  //find and return ticket
  async getTicket (req, res, next) {
    try {
      let ticket = await req.app.services.tickets.getTicket(req.params.id);
      return res.status(200).send(ticket)
    } catch (err) {
      return Errors.generateNotFoundError(res, `ticket`);
    }
  };

  //find and return tickets
  async getTickets (req, res, next) {
    let query = Queries.generateTicketQuery(req);
    try {
      let count = await req.app.services.count.countTickets(query.search);
      let tickets = await req.app.services.tickets.getTickets(query);
      return res.status(200).send({tickets, count});
    } catch (err) {
      return Errors.generateNotFoundError(res, `ticket`);
    }
  };

  //create and return ticket
  async createTicket (req, res, next) {
    const TicketObject = {...req.body};
    try {
      let ticket = await req.app.services.tickets.createTicket(TicketObject);
      return res.status(200).send(ticket);
    } catch (err) {
      return Errors.generateCreateError(res, `ticket`);
    }
  };

  //change and return ticket
  async updateTicket (req, res, next) {
    let changes = {...req.body};
    try {
      let ticket = await req.app.services.tickets.updateTicket(req.params.id, changes);
      return res.status(200).send(ticket);
    } catch (err) {
      return Errors.generateUpdateError(res, `ticket`);
    }
  };

  //delete and return ticket
  async deleteTicket (req, res, next) {
    try {
      let ticket = await req.app.services.tickets.deleteTicket(req.params.id);
      return res.status(200).send(ticket);
    } catch (err) {
      return Errors.generateDeleteError(res, `ticket`);
    }
  }
};
