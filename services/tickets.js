class TicketServices {
  constructor(models, app) {
    this.models = models;
    this.app = app;
  };

  //find and return ticket
  async getTicket (_id) {
    let ticket = await this.models.tickets.findOne({_id});
    if (!ticket) {
      throw new Error();
    }
    return ticket;
  };

  //find and return tickets
  async getTickets (query) {
    let tickets = await this.models.tickets.find(query.search).limit(parseInt(query.limit)).skip(parseInt(query.offset));
    if (!tickets || tickets.length === 0) {
      throw new Error();
    }
    return tickets;
  };

  //create and return ticket
  async createTicket (TicketObject) {
    //user-i mej avelacnem
    const newTicket = new this.models.tickets(TicketObject);
    return newTicket.save();
  };

  //update and return ticket
  async updateTicket (_id, obj) {
    const ticket = await this.models.tickets.findOneAndUpdate(_id, obj, {new: true});
    if (!ticket) {
      throw new Error();
    }
    return ticket;
  };

  //delete and return ticket
  async deleteTicket (_id) {
    let ticket = await this.models.tickets.findOneAndUpdate({_id: _id, deletedAt: null}, {deletedAt: Date.now()}, {new: true});
    if (!ticket) {
        throw new Error();
    }
    return ticket;
  }
};

export default TicketServices;
