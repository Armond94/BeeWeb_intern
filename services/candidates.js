class CandidateServices {
  constructor(models, app) {
    this.models = models;
    this.app = app;
  };

  async getCandidate (_id) {
    let candidate = await this.models.candidates.findOne({_id});
    if (!candidate) {
      throw this.app.errors.getError(this.app.errors.TYPES.CANDIDATE_NOT_FOUND);
    }
    return candidate;
  };

  async getCandidates () {
    let candidates = await this.models.candidates.find({});
    if (!candidates || candidates.length === 0) {
      throw this.app.errors.getError(this.app.errors.TYPES.CANDIDATE_NOT_FOUND);
    }
    return candidates;
  };

  async createCandidate (position_id, obj) {
    const newCandidate = new this.models.candidates(obj);
    let candidate = await newCandidate.save();
    let position = await this.models.positions.findOneAndUpdate({_id: position_id}, {$addToSet: {candidates: candidate._id}}, {new: true});
    if (!candidate) {
      throw this.app.errors.getError(this.app.errors.TYPES.CANDIDATE_DOESNT_CREATED);
    }
    if (!position) {
      throw this.app.errors.getError(this.app.errors.TYPES.CANDIDATE_ID_DOESNT_SAVED);
    }
    return candidate;

  };

  async changeCandidate (_id, obj) {
    const candidate = await this.models.candidates.findOneAndUpdate(_id, obj, {new: true});
    if (!candidate) {
      throw this.app.errors.getError(this.app.errors.TYPES.CANDIDATE_DOESNT_UPDATED);
    }
    return candidate;
  };

  async deleteCandidate (_id) {
    let positions = await this.models.positions.updateMany({}, {$pull: {candidates: _id}}, {new: true});
    let candidate = await this.models.candidates.findOneAndDelete({_id});
    if (!candidate) {
        throw this.app.errors.getError(this.app.errors.TYPES.CANDIDATE_DOESNT_DELETED);
    }
    return candidate;
  };
};

module.exports = CandidateServices;
