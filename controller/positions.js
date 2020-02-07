import Errors from '../errors';
import Queries from '../helpers/generateQuery';

export default class PositionsController {

  //find position
  async getPosition (req, res, next) {
    try {
      let position = await req.app.services.positions.getPosition(req.params.id);
      return res.status(200).send(position);
    } catch (err) {
      return Errors.generateNotFoundError(res, `position`);
    }
  };

  //find positions
  async getPositions (req, res, next) {
    let query = Queries.generatePositionQuery(req);
    try {
      let count = await req.app.services.count.countPositions(query.search);
      let positions = await req.app.services.positions.getPositions(query);
      return res.status(200).send({positions, count});
    } catch (err) {
      return Errors.generateNotFoundError(res, `position`);
    }
  };

  //create positions
  async createPosition (req, res, next) {
    let positionObject = {...req.body};
    try {
      let position = await req.app.services.positions.createPosition(positionObject);
      return res.status(200).send(position);
    } catch (err) {
      return Errors.generateCreateError(res, `position`);
    }
  };

  //update position
  async updatePosition (req, res, next) {
    let obj = {...req.body};
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
