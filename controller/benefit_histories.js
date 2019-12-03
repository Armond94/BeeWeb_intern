import Errors from '../errors';
import Queries from '../helpers/generateQuery';

export default class BenefitHistoriesController {

  //find benefit history
  async getBenefitHistory (req, res, next) {
    try {
      let benefit_history = await req.app.services.benefit_histories.getBenefitHistory(req.params.id);
      return res.status(200).send(benefit_history);
    } catch (err) {
      return Errors.generateNotFoundError(res, `benefit history`);
    }
  };

  //find benefit histories
  async getBenefitHistories(req, res, next) {
    try {
      let query = Queries.generateBenefitHistoriesQuery(req);
      let count = await req.app.services.count.countBenefitHistories(query.search);
      let benefit_histories = await req.app.services.benefit_histories.getBenefitHistories(query);
      return res.status(200).send({benefit_histories, count});
    } catch (err) {
      return Errors.generateNotFoundError(res, `benefit history`);
    }
  };

  //create benefit history
  async createBenefitHistory (req, res, next) {
    let benefit_history_object = {...req.body};
    try {
      let benefit_history = await req.app.services.benefit_histories.createBenefitHistory(benefit_history_object);
      return res.status(200).send(benefit_history);
    } catch (err) {
      return Errors.generateCreateError(res, `benefit history`);
    }
  };

  //update benefit
  async updateBenefitHistory (req, res, next) {
    const changes = {...req.body};
    try {
      let benefit_history = await req.app.services.benefit_histories.updateBenefitHistory(req.params.id, changes);
      return res.status(200).send(benefit_history);
    } catch (err) {
      return Errors.generateUpdateError(res, `benefit history`);
    }
  };

  //delete benefit history
  async deleteBenefitHistory (req, res, next) {
    try {
      let benefit_history = await req.app.services.benefit_histories.deleteBenefitHistory(req.params.id);
      return res.status(200).send(benefit_history);
    } catch (err) {
      return Errors.generateDeleteError(res, `benefit history`);
    }
  };
};
