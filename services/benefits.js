class BenefitServices {
  constructor (models, app) {
    this.models = models;
    this.app = app;
  };

  //find benefit
  async getBenefit (_id) {
    let benefit = await this.models.benefits.findOne({_id, deletedAt: null});
    if (!benefit) {
      throw new Error();
    }
    return benefit;
  };

  //find benefits
  async getBenefits(query) {
    let benefits = await this.models.benefits.find(query.search).limit(parseInt(query.limit)).skip(parseInt(query.offset));
    if (!benefits || benefits.length === 0) {
      throw new Error();
    }
    return benefits;
  };

  //create benefit
  async createBenefit (benefitObject) {
    const newBenefit = new this.models.benefits(benefitObject);
    return await newBenefit.save();
  };

  //change benefit
  async updateBenefit (_id, obj) {
    const benefit = await this.models.benefits.findOneAndUpdate({_id, deletedAt: null}, obj, {new: true});
    if (!benefit) {
      throw new Error();
    }
    return benefit;
  };

  //delete benefit
  async deleteBenefit (benefit_id) {
    let benefit_histories = await this.models.benefit_histories.updateMany({benefit_id, deletedAt: null}, {deletedAt: Date.now()});
    let benefit = await this.models.benefits.findOneAndUpdate({_id: benefit_id, deletedAt: null}, {deletedAt: Date.now()}, {new: true});
    if (!benefit) {
        throw new Error();
    }
    return benefit;
  };
};

export default BenefitServices;
