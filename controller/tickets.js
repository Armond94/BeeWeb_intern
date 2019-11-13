class TicketsController {

  //find and return ticket
  async getTicket (req, res, next) {
    try {
      let ticket = await req.app.services.tickets.getTicket(req.params.id);
      return res.status(200).send(ticket)
    } catch (err) {
      next(err);
    }
  };

  //find and return tickets
  async getTickets (req, res, next) {
    try {
      let tickets = await req.app.services.tickets.getTicket();
      return res.status(200).send(tickets)
    } catch (err) {
      next(err);
    }
  };

  //create and return ticket
  async createTicket (req, res, next) {
    const {userId, startDate, endDate} = req.body;
    if (!userId || !startDate || !endDate) {
      return res.send('incorect data');
    }
    try {
      let ticket = await req.app.services.tickets.createTicket(userId, startDate, endDate);
      return res.status(200).send(ticket);
    } catch (err) {
      return next(err);
    }
  };

  //change and return ticket
  async changeTicket (req, res, next) {
    let obj = {...req.body};
    try {
      let ticket = await req.app.services.tickets.changeTicket(obj);
      return res.status(200).send(ticket);
    } catch (err) {
      return next(err);
    }
  };

  //delete and return ticket
  async deleteTicket (req, res, next) {
    try {
      let ticket = await req.app.services.tickets.deleteTicket(req.params.id);
      return res.status(200).send(ticket);
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = TicketsController;
