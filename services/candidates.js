class CandidateServices {
  constructor(models) {
    this.models = models
  };

  async getCandidate (_id) {
    let candidate = await this.models.candidates.findOne({_id});
    if (!candidate) {
      throw new Error('candidate not found');
    }
    return candidate;
  };

  async getCandidates () {
    let candidates = await this.models.candidates.find({});
    if (!candidates || candidates.length === 0) {
      throw new Error('!candidate not found');
    }
    return candidates;
  };

  async createCandidate (position_id, obj) {
    const newCandidate = new this.models.candidates(obj);
    let candidate = await newCandidate.save();
    let position = await this.models.positions.findOneAndUpdate({_id: position_id}, {$addToSet: {candidates: candidate._id}}, {new: true});
    if (!candidate) {
      throw new Error('!candidate doesnt created');
    }
    if (!position) {
      throw new Error('!candidate id doesnt saved');
    }
    return candidate;

  };

  async changeCandidate (_id, obj) {
    const candidate = await this.models.candidates.findOneAndUpdate(_id, obj, {new: true});
    if (!candidate) {
      throw new Error('!candidate doesnt updated');
    }
    return candidate;
  };

  async deleteCandidate (_id) {
    let positions = await this.models.positions.updateMany({}, {$pull: {candidates: _id}}, {new: true});
    let candidate = await this.models.candidates.findOneAndDelete({_id});
    if (!candidate) {
        throw new Error('!candidate doesnt deleted');
    }
    return candidate;
  };
};

module.exports = CandidateServices;
