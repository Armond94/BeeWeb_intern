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
  async createBenefit (benefitObject) {
    const newBenefit = new this.models.benefits(benefitObject);
    return await newBenefit.save();
  };

  //give benefit to user
  async addBenefit (benefitObject) {
    const newBenefits_hystory = new this.models.benefits_hystory(benefitObject);
    return await newBenefits_hystory.save();
  };

  //find user benefits
  async userBenefits (user_id) {
    let benefits = await this.models.benefits_hystory.find({user_id});
    if (!benefits || benefits.length === 0) {
      throw new Error();
    }
    return benefits;
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

export default BenefitServices;
