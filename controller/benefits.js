const Errors = require('../errors');

class BenefitsController {

  //find benefit
  async getBenefit (req, res, next) {
    try {
      let benefit = await req.app.services.benefits.getBenefit(req.params.id);
      return res.status(200).send(benefit);
    } catch (err) {
      return Errors.generateNotFoundError(res, `benefit`);
    }
  };

  //find benefits
  async getBenefits(req, res) {
    try {
      let benefits = await req.app.services.benefits.getBenefits();
      res.status(200).send(benefits);
    } catch (err) {
      return Errors.generateNotFoundError(res, `benefit`);
    }
  }

  //create benefit
  async createBenefit (req, res, next) {
    const {benefitObject} = req.body;
    try {
      let benefit = await req.app.services.benefits.createBenefit(benefitObject);
      res.status(200).send(benefit);
    } catch (err) {
      return Errors.generateCreateError(res, `benefit`);
    }
  };

  //give benefit to user
  async addBenefit (req, res, next) {
    let {user_id, benefit_id} = req.body;

    try {
        let benefitsHystory = await req.app.services.benefits.addBenefit(user_id, benefit_id);
        res.status(200).send(benefitsHystory);
    } catch (err) {
      return Errors.generateAddError(res, `benefit`);
    }
  };

  //update benefit
  async updateBenefit (req, res, next) {
    const obj = req.body;
    try {
      const benefit = await req.app.services.benefits.updateBenefit(req.params.id, obj);
      res.status(200).send(benefit);
    } catch (err) {
      return Errors.generateUpdateError(res, `benefit`);
    }
  };

  async deleteBenefit (req, res, next) {
    try {
      await req.app.services.benefits.deleteBenefit(req.params.id);
      return res.status(200).send('benefit succesfully deleted');
    } catch (err) {
      return Errors.generateDeleteError(res, `benefit`);
    }
  };
};

module.exports = BenefitsController;
