class CandidateServices {
  constructor(models, app) {
    this.models = models;
    this.app = app;
  };

  //find candidate by id
  async getCandidate (_id) {
    let candidate = await this.models.candidates.findOne({_id});
    if (!candidate) {
      throw new Error();
    }
    return candidate;
  };

  //find candidates
  async getCandidates (query) {
    let candidates = await this.models.candidates.find(query.search).limit(parseInt(query.limit)).skip(parseInt(query.offset));
    if (!candidates || candidates.length === 0) {
      throw new Error();
    }
    return candidates;
  };

  //create candidate
  async createCandidate (position_id, obj) {
    const newCandidate = new this.models.candidates(obj);
    let candidate = await newCandidate.save();
    let position = await this.models.positions.findOneAndUpdate({_id: position_id}, {$addToSet: {candidates: candidate._id}}, {new: true});
    if (!candidate || !position) {
      throw new Error();
    }
    return candidate;
  };

  //update candidate
  async changeCandidate (_id, obj) {
    const candidate = await this.models.candidates.findOneAndUpdate(_id, obj, {new: true});
    if (!candidate) {
      throw new Error();
    }
    return candidate;
  };

  //delete candidate
  async deleteCandidate (_id) {
    let positions = await this.models.positions.updateMany({}, {$pull: {candidates: _id}}, {new: true});
    let candidate = await this.models.candidates.findOneAndDelete({_id});
    if (!candidate) {
        throw new Error();
    }
    return candidate;
  };
};

export default CandidateServices;
