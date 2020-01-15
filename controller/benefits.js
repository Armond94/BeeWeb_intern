import Errors from '../errors';
import Queries from '../helpers/generateQuery';

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
    let query = Queries.generateBenefitQuery(req);
    try {
      let count = await req.app.services.count.countBenefits(query.search);
      let benefits = await req.app.services.benefits.getBenefits(query);
      return res.status(200).send({benefits, count});
    } catch (err) {
      return Errors.generateNotFoundError(res, `benefit`);
    }
  };

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

  //update benefit
  async updateBenefit (req, res, next) {
    const obj = {...req.body};
    try {
      const benefit = await req.app.services.benefits.updateBenefit(req.params.id, obj);
      return res.status(200).send(benefit);
    } catch (err) {
      return Errors.generateUpdateError(res, `benefit`);
    }
  };

  //delete benefit
  async deleteBenefit (req, res, next) {
    try {
      let benefit = await req.app.services.benefits.deleteBenefit(req.params.id);
      return res.status(200).send(benefit);
    } catch (err) {
      return Errors.generateDeleteError(res, `benefit`);
    }
  };
};
