const Errors = require('../errors');

class UsersController {

  //find user
  async getUser (req, res, next) {
    try {
      let user = await req.app.services.users.getUser(req.params.id);
      return res.status(200).send(user);
    } catch (err) {
      return Errors.generateNotFoundError(res, `user`);
    }
  };

  //find all users
  async getUsers (req, res, next) {
    try {
      let users = await req.app.services.users.getUsers();
      return res.status(200).send(users);
    } catch (err) {
      return Errors.generateNotFoundError(res, `user`);
    }
  }

  //all users that have benefits
  async usersBenefits (req, res, next) {
    try {
      let users = await req.app.services.users.usersBenefits();
      return res.status(200).send(users);
    } catch (err) {
      return Errors.generateNotFoundError(res, `user`);
    }
  };

  //create user
  async register (req, res, next) {
    let userObject = {...req.body};
    console.log('test in controller req.body', req.body);
    delete userObject.repeatPassword;
    console.log('test in controller req.body delete password', req.body);
    try {
      let user = await req.app.services.users.createUser(userObject);
      return res.status(200).send('successfully registered');
    } catch (err) {
      return Errors.generateRegistrationError(res, `registration`);
    }
  };

  //signin
  async login (req, res, next) {
    try {
      let result = await req.app.services.users.login(req.body.email, req.body.password);
      return res.status(200).send(result);
    } catch (err) {
      return Errors.generateLoginError(res, `login`);
    }
  };

  //change user
  async updateUser (req, res, next) {
    let changes = {...req.body};
    try {
      let user = await req.app.services.users.updateUser(changes, req.params.id);
      return res.status(200).send(user);
    } catch (err) {
      return Errors.generateUpdateError(res, `update`);
    }
  };

  //delete user
  async deleteUser (req, res, next) {
    try {
      let user = await req.app.services.users.deleteUser(req.params.id);
      return res.status(200).send(user);
    } catch (err) {
      return Errors.generateDeleteError(res, `update`);
    }
  };
};

module.exports = UsersController;
