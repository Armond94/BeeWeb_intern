class PositionsController {

  async getPosition (req, res) {
    try {
      let position = await req.app.services.positions.getPostition(req.params.id);
      res.status(200).send(position);
    } catch (err) {
      res.send(err.message);
    }
  };

  async getPositions (req, res) {
    try {
      let positions = await req.app.services.positions.getPostitions();
      res.status(200).send(positions);
    } catch (err) {
      res.send(err.message);
    }
  };

  async createPosition (req, res) {
    try {
      let obj = req.body;
      let position = await req.app.services.positions.createPosition(obj);
      res.status(200).send(position);
    } catch (err) {
      res.send(err.message);
    }
  };

  async changePosition (req, res) {
    let obj = req.body;
    try {
      let position = await req.app.services.positions.changePosition(req.params.id, obj);
      res.status(200).send(position);
    } catch (err) {
      res.send(err.message);
    }
  };

  deletePosition (req, res) {
    try {
      req.app.services.positions.deletePosition(req.params.id);
      res.status(200).send('!position successfuly deleted');
    } catch (err) {
      res.send(200).send(err.message);
    }
  };
};

module.exports = PositionsController;
