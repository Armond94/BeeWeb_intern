const Errors = require('../errors');

class PositionsController {

  //find position
  async getPosition (req, res, next) {
    try {
      let position = await req.app.services.positions.getPostition(req.params.id);
      return res.status(200).send(position);
    } catch (err) {
      return Errors.generateNotFoundError(res, `position`);
    }
  };

  //get all positions
  async getPositions (req, res, next) {
    try {
      let positions = await req.app.services.positions.getPostitions();
      return res.status(200).send(positions);
    } catch (err) {
      return Errors.generateNotFoundError(res, `position`);
    }
  };

  //create positions
  async createPosition (req, res, next) {
    let positionObject = req.body;
    try {
      let position = await req.app.services.positions.createPosition(obj);
      return res.status(200).send(position);
    } catch (err) {
      return Errors.generateCreateError(res, `position`);
    }
  };

  //update position
  async updatePosition (req, res, next) {
    let obj = req.body;
    try {
      let position = await req.app.services.positions.updatePosition(req.params.id, obj);
      return res.status(200).send(position);
    } catch (err) {
      return Errors.generateUpdateError(res, `position`);
    }
  };

  //delete position
  async deletePosition (req, res, next) {
    try {
      let position = await req.app.services.positions.deletePosition(req.params.id);
      return res.status(200).send('!position successfuly deleted');
    } catch (err) {
      return Errors.generateDeleteError(res, `position`);
    }
  };
};

module.exports = PositionsController;
