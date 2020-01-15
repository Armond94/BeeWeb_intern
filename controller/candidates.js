import Errors from '../errors';
import Queries from '../helpers/generateQuery';

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
    let query = Queries.generateCandidateQuery(req);
    try {
      let count = await req.app.services.count.countCandidates(query.search);
      let candidates = await req.app.services.candidates.getCandidates(query);
      return res.status(200).send({candidates, count});
    } catch (err) {
      return Errors.generateNotFoundError(res, `candidate`);
    }
  };

  //create candidate
  async createCandidate (req, res, next) {
    let candidateObject = {...req.body};
    // candidateObject.cv = req.file.filename;
    try {
      let candidate = await req.app.services.candidates.createCandidate(candidateObject);
      return res.status(200).send(candidate);
    } catch (err) {
      return Errors.generateCreateError(res, `candidate`);
    }
  };

  //get cv
  async getCV (req, res, next) {
    try {
      let readstream = await req.app.services.candidates.getCV(req.params.id);
      return readstream.pipe(res);
    } catch (err) {
      return Errors.generateNotFoundError(res, `cv`);
    }
  };

  // delete cv
  async removeCV (req, res, next) {
    try {
      let gridStor = await req.app.services.candidates.removeCV(req.params.id);
      return res.status(200).send('cv successfully deleted');
    } catch (err) {
      return Errors.generateDeleteError(res, `update`);
    }
  };

  //change candidate
  async changeCandidate (req, res, next) {
    const changes = {...req.body};
    try {
      const candidate = await req.app.services.candidates.changeCandidate(req.params.id, changes);
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
