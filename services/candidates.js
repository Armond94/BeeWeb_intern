import mongoose from "mongoose";
import Grid from "gridfs-stream";
const conn = mongoose.connection;
Grid.mongo = mongoose.mongo;
var gfs;
conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('cv');
});

class CandidateServices {
  constructor(models, app) {
    this.models = models;
    this.app = app;
  };

  //find candidate by id
  async getCandidate (_id) {
    let candidate = await this.models.candidates.findOne({_id: _id, deletedAt: null})
      populate('position');
    if (!candidate) {
      throw new Error();
    }
    return candidate;
  };

  //get cv
  async getCV (_id) {
    let candidate = await this.models.candidates.findOne({_id});
    let cv = await gfs.files.findOne({cv: candidate.cv});
    if (!cv) {
      throw new Error('!cv not found');
    }
      const readstream = gfs.createReadStream(cv.filename);
      return readstream;
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
  async createCandidate (candidateObject) {
    const newCandidate = new this.models.candidates(candidateObject);
    let candidate = await newCandidate.save();
    let position = await this.models.positions.findOneAndUpdate({_id: candidateObject.position, deletedAt: null}, {$addToSet: {candidates: candidate._id}}, {new: true});
    if (!candidate || !position) {
      throw new Error();
    }
    return candidate;
  };

  //update candidate
  async changeCandidate (_id, obj) {
    const candidate = await this.models.candidates.findOneAndUpdate({_id:_id, deletedAt: null}, obj, {new: true});
    if (!candidate) {
      throw new Error();
    }
    return candidate;
  };

  // removeCV
  async removeCV (_id) {
    let candidate = await this.models.candidates.findOne({_id, deleted: null});
    let gridStor = await gfs.remove({filename: candidate.cv, root: 'uploads'});
    let newCandidate = await this.models.candidates.findOneAndUpdate({_id, deleted: null}, {avatar: null}, {new: true});
    if (!gridStor) {
      throw new Error();
    };
    return gridStor;
  };

  //delete candidate
  async deleteCandidate (_id) {
    let positions = await this.models.positions.updateMany({}, {$pull: {candidates: _id}}, {new: true});
    let candidate = await this.models.candidates.findOneAndUpdate({_id: _id, deletedAt: null}, {deletedAt: Date.now()}, {new: true});
    if (!candidate) {
        throw new Error();
    }
    return candidate;
  };
};

export default CandidateServices;
