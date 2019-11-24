import Errors from '../errors';

export default class UsersController {

  //find same user
  async getSameUser (req, res, next) {
    try {
      let user = await req.app.services.users.getUser(req.user.id);
      return res.status(200).send(user);
    } catch (err) {
      return Errors.generateNotFoundError(res, `user`);
    }
  };

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
    let limit = req.query.limit;
    let offset = req.query.offset;
    if (!req.query.limit || !req.query.offset) {
      limit = 10;
      offset = 0;
    }
    let query = {};
    try {
      let users = await req.app.services.users.getUsers(query, limit, offset);
      return res.status(200).send(users);
    } catch (err) {
      return Errors.generateNotFoundError(res, `user`);
    }
  };

  //find user benefits
  async userBenefits (req, res, next) {
    try {
      let benefits = await req.app.services.benefits.userBenefits(req.params.id);
      return res.status(200).send(benefits);
    } catch (err) {
      return Errors.generateNotFoundError(res, `benefit`);
    }
  }

  //all users that have benefits
  async usersBenefits (req, res, next) {
    try {
      let query = {...req.query};
      console.log('query - ', query);
      let users = await req.app.services.users.usersBenefits();
      return res.status(200).send(users);
    } catch (err) {
      return Errors.generateNotFoundError(res, `user`);
    }
  };

  //create user
  async register (req, res, next) {
    let userObject = {...req.body};
    delete userObject.repeatPassword;
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
