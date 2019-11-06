class CandidatesController {

  async getCandidate (req, res) {
    try {
      let candidate = await req.app.services.candidates.getCandidate(req.params.id);
      res.status(200).send(candidate);
    } catch (err) {
      res.send(err.message);
    }
  };

  async getCandidates (req, res) {
    try {
      let candidates = await req.app.services.getCandidates();
      res.status(200).send(candidates);
    } catch (err) {
      res.send(err.message);
    }
  };

  async createCandidate (req, res) {
    const {firstName, lastName, email, phoneNumber} = req.body;
    if (!firstName || !lastName || !email || !phoneNumber) {
      res.send('fill correct');
    };
    let obj = req.body;
    try {
      let candidate = await req.app.services.candidates.createCandidate(req.params.id, obj);
      res.status(200).send(candidate);
    } catch (err) {
      res.status(500).send(err.message);
    }
  };

  async changeCandidate (req, res) {
    const obj = req.body;
    try {
      const candidate = await req.app.services.candidate.changecandidate(req.params.id, obj);
      res.status(200).send(candidate);
    } catch (err) {
      res.status(500).send(err.message);
    }
  };

  deleteCandidate (req, res) {
    try {
      req.app.services.candidates.deleteCandidate(req.params.id);
      res.status(200).send('candidate succesfully deleted');
    } catch (err) {
      res.status(500).send(err.message);
    }
  };
};

module.exports = CandidatesController;
