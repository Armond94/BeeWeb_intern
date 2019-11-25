import Errors from '../errors';

export default class BenefitsController {

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
  async getBenefits(req, res, next) {
    try {
      let query = {...req.query};
      let benefits = await req.app.services.benefits.getBenefits(query);
      return res.status(200).send(benefits);
    } catch (err) {
      return Errors.generateNotFoundError(res, `benefit`);
    }
  };

  //
  async benefitsHistory (req, res, next) {
    console.log('controller');
    try {
      console.log('controller222222222222');
      let benefits_history = await req.app.services.benefits.benefitsHistory();
      console.log('benefits_history33333333333', benefits_history);
      res.status(200).send(benefits_history);
    } catch (err) {
      console.log('err.message44444', err.message);
      return Errors.generateNotFoundError(res, `benefit history`);
    }
  }

  //create benefit
  async createBenefit (req, res, next) {
    const benefitObject = {...req.body};
    try {
      let benefit = await req.app.services.benefits.createBenefit(benefitObject);
      return res.status(200).send(benefit);
    } catch (err) {
      return Errors.generateCreateError(res, `benefit`);
    }
  };

  //give benefit to user
  async addBenefit (req, res, next) {
    let benefitObject = {...req.body};
    try {
      let benefits_hystory = await req.app.services.benefits.addBenefit(benefitObject);
      return res.status(200).send(benefits_hystory);
    } catch (err) {
      return Errors.generateAddError(res, `benefit`);
    }
  };

  //update benefit
  async updateBenefit (req, res, next) {
    const obj = req.body;
    try {
      const benefit = await req.app.services.benefits.updateBenefit(req.params.id, obj);
      return res.status(200).send(benefit);
    } catch (err) {
      return Errors.generateUpdateError(res, `benefit`);
    }
  };

  async deleteBenefit (req, res, next) {
    try {
      let benefit = await req.app.services.benefits.deleteBenefit(req.params.id);
      return res.status(200).send(benefit);
    } catch (err) {
      return Errors.generateDeleteError(res, `benefit`);
    }
  };
};
