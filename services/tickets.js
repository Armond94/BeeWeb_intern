class TicketServices {
  constructor(models, app) {
    this.models = models;
    this.app = app;
  };

  //find and return ticket
  async getTicket (_id) {
    let ticket = await this.models.tickets.findOne({_id});
    if (!ticket) {
      throw this.app.errors.getError(this.app.errors.TYPES.TICKET_NOT_FOUND);
    }
    return ticket;
  };

  //find and return tickets
  async getTickets () {
    let tickets = await this.models.tickets.find({});
    if (!tickets || tickets.length === 0) {
      throw this.app.errors.getError(this.app.errors.TYPES.TICKET_NOT_FOUND);
    }
    return tickets;
  };

  //create and return ticket
  async createTicket () {
    const newTicket = new this.models.tickets(userId, startDate, endDate);
    return newPosition.save();
  };

  //change and return ticket
  async changeTicket (_id, obj) {
    const ticket = await this.models.tickets.findOneAndUpdate(_id, obj, {new: true});
    if (!ticket) {
      throw this.app.errors.getError(this.app.errors.TYPES.TICKET_DOESNT_UPDATED);
    }
    return ticket;
  };

  //delete and return ticket
  async deleteTicket (_id) {
    let ticket = await this.models.tickets.findOneAndDelete({_id});
    if (!ticket) {
        throw this.app.errors.getError(this.app.errors.TYPES.TICKET_DOESNT_DELETED);
    }
    return ticket;
  }
};

module.export = TicketServices;
