let registerationFields = ['firstName', 'lastName', 'email', 'role', 'birthday', 'phoneNumber', 'password', 'repeatPassword'];
let loginFields = ['email', 'password'];
let benefitFields = ['title', 'description'];
let positionFields = ['title', 'description', 'type', 'required_qualifications', 'deadline', 'candidates'];
let ticket = ['userId', 'startDate', 'endDate'];
let message = 'please fill all fields correct';

class UserValidation {

    checkForRegister (req, res, next) {
      let keys = Object.keys(req.body);
      let values = Object.values(req.body);
      if (!registerationFields.every(item => keys.includes(item)) || values.includes('') || req.body.password != req.body.repeatPassword) {
        return res.status(400).send(message);
      }
      next();
    };

  checkForLogin (req, res, next) {
    console.log('req.body - ', req.body);
    console.log('req.headers -', req.headers);
    let keys = Object.keys(req.body);
    let values = Object.values(req.body);
    if (!loginFields.every(item => keys.includes(item)) || values.includes('')) {
      return res.status(400).send(message);
    };
    next();
  };

  checkBenefitValidation (req, res, next) {
    let keys = Object.keys(req.body);
    let values = Object.values(req.body);
    if (!benefitFields.every(item => keys.includes(item)) || values.includes('')) {
      return res.status(400).send(message);
    };
    next();
  };

  checkCandidate (req, res, next) {
    let keys = Object.keys(req.body);
    let values = Object.values(req.body);
    if (!benefitFields.every(item => keys.includes(item)) || values.includes('')) {
      return res.status(400).send(message);
    };
    next();
  };

  checkPosition (req, res, next) {
    let keys = Object.keys(req.body);
    let values = Object.values(req.body);
    if (!positionFields.every(item => keys.includes(item)) || values.includes('')) {
      return res.send(message);
    };
    next();
  };

  checkTicket (req, res, next) {
    let keys = Object.keys(req.body);
    let values = Object.values(req.body);
    if (!positionFields.every(item => keys.includes(item)) || values.includes('')) {
      return res.send(message);
    };
    next();
  };

};

module.exports = UserValidation;
