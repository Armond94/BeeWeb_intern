class BenefitsController {

  async getBenefit (req, res, next) {
    try {
      let benefit = await req.app.services.benefits.getBenefit(req.params.id);
      return res.status(200).send(benefit);
    } catch (err) {
      return next(err);
    }
  };

  async getBenefits(req, res) {
    try {
      let benefits = await req.app.services.benefits.getBenefits();
      res.status(200).send(benefits);
    } catch (err) {
      return next(err);
    }
  }

  async createBenefit (req, res, next) {
    const {title, description} = req.body;
    if (!title || !description) {
      res.send('fill correct');
    }
    try {
      let benefit = await req.app.services.benefits.createBenefit(title, description);
      res.status(200).send(benefit);
    } catch (err) {
      return next(err);
    }
  };

  //give benefit to user
  async addBenefit (req, res, next) {
    let {user_id, benefit_id} = req.body;

    try {
        let benefitsHystory = await req.app.services.benefits.addBenefit(user_id, benefit_id);
        res.status(200).send(benefitsHystory);
    } catch (err) {
      return next(err);
    }
  };

  async changeBenefit (req, res, next) {
    const obj = req.body;
    try {
      const benefit = await req.app.services.benefits.changeBenefit(req.params.id, obj);
      res.status(200).send(benefit);
    } catch (err) {
      return next(err);
    }
  };

  async deleteBenefit (req, res, next) {
    try {
      await req.app.services.benefits.deleteBenefit(req.params.id);
      res.status(200).send('benefit succesfully deleted');
    } catch (err) {
      return next(err);
    }
  };
};

module.exports = BenefitsController;
