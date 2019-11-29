class PositionServices {
  constructor (models, app) {
    this.models = models;
    this.app = app;
  };

  //find and return position
  async getPostition (_id) {
    let position = await this.models.positions.findOne({_id: _id, deletedAt: null});
    if (!position) {
      throw new Error();
    }
    return position;
  };

  //find and return positions
  async getPostitions (query) {
    let positions = await this.models.positions.find(query.search).limit(parseInt(query.limit)).skip(parseInt(query.offset));
    if (!positions || positions.length === 0) {
      throw new Error();
    }
    return positions;
  };

  //create positin
  async createPosition (positionObject) {
    const newPosition = new this.models.positions(positionObject);
    return await newPosition.save();
  };

  //update position
  async updatePosition (_id, obj) {
    let position = await this.models.positions.findOneAndUpdate({_id: _id, deletedAt: null}, obj, {new: true});
    if (!position) {
      throw new Error();
    }
    return position;
  };

  //delete position
  async deletePosition (_id) {
    let candidates = await this.models.candidates.updateMany({}, {$pull: {positions: _id}}, {new: true});
    let position = await this.models.positions.findOneAndUpdate({_id: _id, deletedAt: null}, {deletedAt: Date.now()}, {new: true});
    if (!position) {
      throw new Error();
    }
    return position;
  };
};

export default PositionServices;
