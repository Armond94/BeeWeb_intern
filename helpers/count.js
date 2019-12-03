export default class  Count {

  constructor (models) {
    this.models = models;
  }

  async countUsers (query) {
    let count = await this.models.users.countDocuments(query);
    return count;
  };

  async countBenefits (query) {
    let count = await this.models.benefits.countDocuments(query);
    return count;
  };

  async countCandidates (query) {
    let count = await this.models.candidates.countDocuments(query);
    return count;
  };

  async countPositions (query) {
    let count = await this.models.positions.countDocuments(query);
    return count;
  };

  async countTickets (query) {
    let count = await this.models.tickets.countDocuments(query);
    return count;
  };

  async countBenefitHistories (query) {
    let count = await this.models.benefit_histories.countDocuments(query);
    return count;
  };
  
};
