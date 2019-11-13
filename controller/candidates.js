class CandidatesController {

  //find candidate
  async getCandidate (req, res, next) {
    try {
      let candidate = await req.app.services.candidates.getCandidate(req.params.id);
      res.status(200).send(candidate);
    } catch (err) {
      return next(err);
    }
  };

  //find candidates
  async getCandidates (req, res, next) {
    try {
      let candidates = await req.app.services.getCandidates();
      res.status(200).send(candidates);
    } catch (err) {
      return next(err);
    }
  };

  //create candidate
  async createCandidate (req, res, next) {
    const {firstName, lastName, email, phoneNumber} = req.body;
    if (!firstName || !lastName || !email || !phoneNumber) {
      res.send('fill correct');
    };
    let obj = req.body;
    try {
      let candidate = await req.app.services.candidates.createCandidate(req.params.id, obj);
      res.status(200).send(candidate);
    } catch (err) {
      return next(err);
    }
  };

  //change candidate
  async changeCandidate (req, res, next) {
    const obj = req.body;
    try {
      const candidate = await req.app.services.candidate.changecandidate(req.params.id, obj);
      res.status(200).send(candidate);
    } catch (err) {
      return next(err);
    }
  };

  // delete candidate
  deleteCandidate (req, res, next) {
    try {
      req.app.services.candidates.deleteCandidate(req.params.id);
      res.status(200).send('candidate succesfully deleted');
    } catch (err) {
      return next(err);
    }
  };
};

module.exports = CandidatesController;
