class BenefitsController {

  async getBenefit (req, res) {
    try {
      let benefit = await req.app.services.benefits.getBenefit(req.params.id);
      res.status(200).send(benefit);
    } catch (err) {
      res.status(500).send(err.message);
    }
  };

  async getBenefits(req, res) {
    try {
      let benefits = await req.app.services.benefits.getBenefits();
      res.status(200).send(benefits);
    } catch (err) {
      res.status(500).send(err.message);
    }
  }

  async createBenefit (req, res) {
    const {title, description} = req.body;
    if (!title || !description) {
      res.send('fill correct');
    }
    try {
      let benefit = await req.app.services.benefits.createBenefit(title, description);
      res.status(200).send(benefit);
    } catch (err) {
      res.status(500).send(err.message);
    }
  };

  //give benefit to user
  async addBenefit (req, res) {
    let {user_id, benefit_id} = req.body;

    try {
        let benefitsHystory = await req.app.services.benefits.addBenefit(user_id, benefit_id);
        res.status(200).send(benefitsHystory);
    } catch (err) {
      res.send(err.message);
    }
  };

  async changeBenefit (req, res) {
    const obj = req.body;
    try {
      const benefit = await req.app.services.benefits.changeBenefit(req.params.id, obj);
      res.status(200).send(benefit);
    } catch (err) {
      res.status(500).send(err.message);
    }
  };

  async deleteBenefit (req, res) {
    try {
      await req.app.services.benefits.deleteBenefit(req.params.id);
      res.status(200).send('benefit succesfully deleted');
    } catch (err) {
      res.status(500).send(err.message);
    }
  };

};

module.exports = BenefitsController;
