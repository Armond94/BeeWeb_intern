class BenefitHistoriesServices {
  constructor (models, app) {
    this.models = models;
    this.app = app;
  };

  //find benefit history
  async getBenefitHistory (_id) {
    let benefit_history = await this.models.benefit_histories.findOne({_id, deletedAt: null})
    .populate('user_id')
    .populate('benefit_id');
    if (!benefit_history) {
      throw new Error();
    }
    return benefit_history;
  };

  //find benefit histories
  async getBenefitHistories(query) {
    let benefit_histories = await this.models.benefit_histories.find(query.search).limit(parseInt(query.limit)).skip(parseInt(query.offset))
      .populate('user_id')
      .populate('benefit_id');
    if (!benefit_histories || benefit_histories.length === 0) {
      throw new Error();
    }
    return benefit_histories;
  };

  //create benefit history (give benefit to user)
  async createBenefitHistory (benefit_history_object) {
    const new_benefit_history = new this.models.benefit_histories(benefit_history_object);
    return await new_benefit_history.save();
  };

  //change benefit history
  async updateBenefitHistory (_id, obj) {
    const benefit_history = await this.models.benefit_histories.findOneAndUpdate({_id, deletedAt: null}, obj, {new: true});
    if (!benefit_history) {
      throw new Error();
    }
    return benefit_history;
  };

  //delete benefit history
  async deleteBenefitHistory (_id) {
    let benefit_history = await this.models.benefit_histories.findOneAndUpdate({_id: _id, deletedAt: null}, {deletedAt: Date.now()}, {new: true});
    if (!benefit_history) {
        throw new Error();
    }
    return benefit_history;
  };
};

export default BenefitHistoriesServices;
