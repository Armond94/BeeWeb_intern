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
    if (!registerationFields.every(item => keys.includes(item)) || values.includes('') || req.body.password != req.body.repeatPassword || req.body.password.length < 5) {
      registerationFields.every(item => {
        return keys.includes(item);
      });
        return res.status(400).send(message);
    };
    let checkEmailByRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!checkEmailByRegexp.test(String(req.body.email).toLowerCase())) {
      return res.status(400).send(message)
    }
    next();
  };

  checkForLogin (req, res, next) {
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
    console.log('keys - ', keys);
    console.log('values - ', values);
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

export default UserValidation;
