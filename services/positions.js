class PositionServices {
  constructor (models, app) {
    this.models = models;
    this.app = app;
  };

  async getPostition (_id) {
    let position = await this.models.positions.findOne({_id});
    if (!position) {
      throw this.app.errors.getError(this.app.errors.TYPES.POSITION_NOT_FOUND);
    }
    return position;
  };

  async getPostitions () {
    let positions = await this.models.positions.find({});
    if (!positions || positions.length === 0) {
      throw this.app.errors.getError(this.app.errors.TYPES.POSITION_NOT_FOUND);
    }
    return positions;
  };

  createPosition (obj) {
    const newPosition = new this.models.positions(obj);
    return newPosition.save();
  };

  async changePosition (_id, obj) {
    let position = await this.models.positions.findOneAndUpdate({_id}, obj, {new: true});
    if (!position) {
      throw this.app.errors.getError(this.app.errors.TYPES.POSITION_NOT_FOUND);
    }
    return position;
  };

  async deletePosition (_id) {
    // let candidates = await this.models.candidates.updateMany({}, {$pull: {positions: _id}}, {new: true});
    let position = await this.models.positions.findOneAndDelete({_id});
    if (!position) {
      throw this.app.errors.getError(this.app.errors.TYPES.POSITION_NOT_FOUND);
    }
    return position;
  };
};

module.exports = PositionServices;
