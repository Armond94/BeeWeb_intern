class PositionServices {
  constructor (models, app) {
    this.models = models;
    this.app = app;
  };

  //find and return position
  async getPostition (_id) {
    let position = await this.models.positions.findOne({_id});
    if (!position) {
      throw new Error();
    }
    return position;
  };

  //find and return all positions
  async getPostitions () {
    let positions = await this.models.positions.find({});
    if (!positions || positions.length === 0) {
      throw new Error();
    }
    return positions;
  };

  //create positin
  createPosition (obj) {
    const newPosition = new this.models.positions(obj);
    return newPosition.save();
  };

  //update position
  async updatePosition (_id, obj) {
    let position = await this.models.positions.findOneAndUpdate({_id}, obj, {new: true});
    if (!position) {
      throw new Error();
    }
    return position;
  };

  //delete position
  async deletePosition (_id) {
    let candidates = await this.models.candidates.updateMany({}, {$pull: {positions: _id}}, {new: true});
    let position = await this.models.positions.findOneAndDelete({_id});
    if (!position) {
      throw new Error();
    }
    return position;
  };
};

module.exports = PositionServices;
