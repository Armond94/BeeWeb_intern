import Errors from '../errors';
import Queries from '../helpers/generateQuery';

export default class UsersController {

  //find current user
  async getCurrentUser (req, res, next) {
    try {
      let user = await req.app.services.users.getUser(req.user.id);
      return res.status(200).send(user);
    } catch (err) {
      return Errors.generateNotFoundError(res, `user`);
    }
  };

  //find user by id
  async getUser (req, res, next) {
    try {
      let user = await req.app.services.users.getUser(req.params.id);
      return res.status(200).send(user);
    } catch (err) {
      return Errors.generateNotFoundError(res, `user`);
    }
  };

  //find users
  async getUsers (req, res, next) {
    let query = Queries.generateUserQuery(req);
    let count = await req.app.services.count.countUsers(query.search);
    try {
      let users = await req.app.services.users.getUsers(query);
      return res.status(200).send({users, count});
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

  //find all users that have benefits
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

  //refresh token
  async refreshToken (req, res, next) {
    try {
      let result = await req.app.services.users.refreshToken(req.body.refreshToken, req.user.email);
      return res.status(200).json(result);
    } catch (err) {
      return generateRefreshTokenError(res, `refresh token`);
    }
  };

  //update user data
  async updateUser (req, res, next) {
    let changes = {...req.body};
    try {
      let user = await req.app.services.users.updateUser(changes, req.params.id);
      return res.status(200).send(user);
    } catch (err) {
      return Errors.generateUpdateError(res, `update`);
    }
  };

  //rate user
  async rateUser (req, res, next) {
    try {
      let result = await req.app.services.users.rate(req.body.rating, req.params.id, req.user.id);
      let user = await req.app.services.users.updateUserRating(req.params.id);
      return res.status(200).send(user);
    } catch (err) {
      return Errors.generateUpdateError(res, `update`);
    }
  };

  // upload avatar
  async uploadAvatar (req, res, next) {
    let changes = {avatar: req.file.filename}
    try {
      let user = await req.app.services.users.updateUser(changes, req.user.id);
      return res.status(200).send(user);
    } catch (err) {
      return Errors.generateUpdateError(res, `update`);
    }
  };

  //get avatar
  async getAvatar (req, res, next) {
    try {
      let readstream = await req.app.services.users.getAvatar(req.params.id);
      return readstream.pipe(res);
    } catch (err) {
      return Errors.generateNotFoundError(res, `avatar`);
    }
  };

  //delete avatar
  async removeAvatar (req, res, next) {
    try {
      let gridStor = await req.app.services.users.removeAvatar(req.user.id);
      return res.status(200).send('avatar successfully deleted');
    } catch (err) {
      console.log(err)
      return Errors.generateDeleteError(res, `update`);
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
