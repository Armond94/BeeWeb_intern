let registerationFields = ['firstName', 'lastName', 'email', 'role', 'birthday', 'phoneNumber', 'password', 'repeatPassword'];
let loginFields = ['email', 'password'];
let benefitFields = ['title', 'description'];
let positionFields = ['title', 'description', 'type', 'required_qualifications', 'deadline', 'candidates'];
let ticket = ['userId', 'startDate', 'endDate'];
let message = 'please fill all fields correct';

class UserValidation {

    checkForRegister (req, res, next) {
      console.log('22222222 test checkForRegister - req.body', req.body);
      let keys = Object.keys(req.body);
      let values = Object.values(req.body);
      console.log('test values', values);
      console.log('test keys', keys);

      if (!registerationFields.every(item => keys.includes(item)) || values.includes('') || req.body.password != req.body.repeatPassword) {

        console.log('3333, fields not correct ')
        // console.log('33113322266', registerationFields.every(item => keys.includes(item)));
        registerationFields.every(item => {
          console.log('33331111111 - keys.includes(item) - ', keys.includes(item));
          return keys.includes(item);
        });

        console.log('333322222 values.includes() - ', values.includes(''));
        console.log('33333-33333 req.body.password != req.body.repeatPassword', req.body.password != req.body.repeatPassword);

        return res.status(400).send(message);
      }
      console.log('444444 , all fields correct');
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
