class BenefitServices {
  constructor (models, app) {
    this.models = models;
    this.app = app;
  };

  //get benefit
  async getBenefit (_id) {
    let benefit = await this.models.benefits.findOne({_id});
    if (!benefit) {
      throw new Error();
    }
    return benefit;
  };

  //get benefits
  async getBenefits() {
    let benefits = await this.models.benefits.find();
    if (!benefits || benefits.length === 0) {
      throw new Error();
    }
    return benefits;
  }

  //create benefit
  createBenefit (benefitObject) {
    const newBenefit = new this.models.benefits(benefitObject);
    return newBenefit.save();
  };

  //give benefit to user
  async addBenefit (user_id, benefit_id) {
    const newBenefitsHystory = new this.models.benefitsHystory({user_id, benefit_id});
    return newBenefitsHystory.save();
  }

  //change benefit
  async updateBenefit (_id, obj) {
    const benefit = await this.models.benefits.findOneAndUpdate(_id, obj, {new: true});
    if (!benefit) {
      throw new Error();
    }
    return benefit;
  };

  //delete benefit
  async deleteBenefit (_id) {
    let users = await this.models.users.updateMany({}, {$pull: {benefits: _id}}, {new: true});
    let benefit = await this.models.benefits.findOneAndDelete({_id});
    if (!benefit) {
        throw new Error();
    }
    return benefit;
  };
};

module.exports = BenefitServices;
