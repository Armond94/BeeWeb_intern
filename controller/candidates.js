import Errors from '../errors';

export default class CandidatesController {

  //find candidate
  async getCandidate (req, res, next) {
    try {
      let candidate = await req.app.services.candidates.getCandidate(req.params.id);
      return res.status(200).send(candidate);
    } catch (err) {
      return Errors.generateNotFoundError(res, `candidate`);
    }
  };

  //find candidates
  async getCandidates (req, res, next) {
    try {
      let candidates = await req.app.services.getCandidates();
      return res.status(200).send(candidates);
    } catch (err) {
      return Errors.generateNotFoundError(res, `candidate`);
    }
  };

  //create candidate
  async createCandidate (req, res, next) {
    let candidateObject = req.body;
    try {
      let candidate = await req.app.services.candidates.createCandidate(req.params.id, candidateObject);
      return res.status(200).send(candidate);
    } catch (err) {
      return Errors.generateCreateError(res, `candidate`);
    }
  };

  //change candidate
  async changeCandidate (req, res, next) {
    const obj = req.body;
    try {
      const candidate = await req.app.services.candidate.changecandidate(req.params.id, obj);
      return res.status(200).send(candidate);
    } catch (err) {
      return Errors.generateUpdateError(res, `candidate`);
    }
  };

  // delete candidate
  deleteCandidate (req, res, next) {
    try {
      req.app.services.candidates.deleteCandidate(req.params.id);
      return res.status(200).send('candidate succesfully deleted');
    } catch (err) {
      return Errors.generateDeleteError(res, `candidate`);
    }
  };
};
