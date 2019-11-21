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
  async getTickets () {
    let tickets = await this.models.tickets.find({});
    if (!tickets || tickets.length === 0) {
      throw new Error();
    }
    return tickets;
  };

  //create and return ticket
  async createTicket (TicketObject) {
    //user-i mej avelacnem
    const newTicket = new this.models.tickets(TicketObject);
    return newPosition.save();
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
    //user-i mejic jnjem
    let ticket = await this.models.tickets.findOneAndDelete({_id});
    if (!ticket) {
        throw new Error();
    }
    return ticket;
  }
};

export default TicketServices;
