class positionServices {
  constructor (models) {
    this.models = models
  };

  async getPostition (_id) {
    let position = await this.models.positions.findOne({_id});
    if (!position) {
      throw new Error('!position not found')
    }
    return position;
  };

  async getPostitions () {
    let positions = await this.models.positions.find({});
    if (!positions || positions.length === 0) {
      throw new Error('!position not found')
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
      throw new Error('!position not found');
    }
    return position;
  };

  async deletePosition (_id) {
    // let candidates = await this.models.candidates.updateMany({}, {$pull: {positions: _id}}, {new: true});
    let position = await this.models.positions.findOneAndDelete({_id});
    if (!position) {
      throw new Error('!position not found');
    }
    return position;
  };
};

module.exports = positionServices;
