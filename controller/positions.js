class PositionsController {

  async getPosition (req, res, next) {
    try {
      let position = await req.app.services.positions.getPostition(req.params.id);
      res.status(200).send(position);
    } catch (err) {
      return next(err);
    }
  };

  async getPositions (req, res, next) {
    try {
      let positions = await req.app.services.positions.getPostitions();
      res.status(200).send(positions);
    } catch (err) {
      return next(err);
    }
  };

  async createPosition (req, res, next) {
    try {
      let obj = req.body;
      let position = await req.app.services.positions.createPosition(obj);
      res.status(200).send(position);
    } catch (err) {
      return next(err);
    }
  };

  async changePosition (req, res, next) {
    let obj = req.body;
    try {
      let position = await req.app.services.positions.changePosition(req.params.id, obj);
      res.status(200).send(position);
    } catch (err) {
      return next(err);
    }
  };

  deletePosition (req, res, next) {
    try {
      req.app.services.positions.deletePosition(req.params.id);
      res.status(200).send('!position successfuly deleted');
    } catch (err) {
      return next(err);
    }
  };
};

module.exports = PositionsController;
