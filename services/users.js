const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserServices {
  constructor (models, app) {
    this.models = models;
    this.app = app;
  };

  //find user by id
  async getUser (_id) {
    let user = await this.models.users.findOne({_id: _id, deletedAt: null}, {password: 0});
    if (!user) {
      throw new Error();
    }
    return user;
  };

  //get all users
  async getUsers () {
    let users = await this.models.users.find({deletedAt: null}, {password: 0});
    if (!users || users.length === 0) {
      throw new Error();
    }
    return users;
  }

  // all users that have benefits
  async usersBenefits () {
      let users_id = await this.models.benefitsHystory.distinct('user_id');
      let users = await this.models.users.find({_id: {$in: users_id}, deletedAt: null}, {password: 0});
      if (!users || users.length === 0) {
        throw new Error();
      }
      return users;
  }

  //create user
  async createUser (userObject) {
      let user = await this.models.users.findOne({email: userObject.email});
      if (user && user.deletedAt == null) {
        throw new Error('email is already registered');
      }

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(userObject.password, salt, async (err, hash) => {
          if (err) {
            throw err;
          }
          userObject.password = hash;
        });
      });

      if (user && user.deletedAt != null) {
        userObject.deletedAt = null;
        let result = await this.models.users.findOneAndUpdate({_id: user._id}, userObject, {new: true});
        if (!result) {
          throw new Error('');
        }
        result.password = null;
        return result;
      }

      let newUser = new this.models.users(userObject);
      return await newUser.save();
  };

  //signin
  async login (email, password) {
    let user = await this.models.users.findOne({email: email, deletedAt: null});
    if (!user) {
      throw this.app.errors.getError(this.app.errors.TYPES.AUTHENTIFICATION_FAILED);
    }
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err || !isMatch) {
          return reject(err || this.app.errors.getError(this.app.errors.TYPES.PASSWORD_INCORECT));
        }
        const token = jwt.sign({email: email, userId: user._id}, process.env.JWT_KEY || 'secret', { expiresIn: '24h'});
        user.password = null;
        return resolve({user, token});
      });
    });
  };

  //change user
  async changeUser (changes, _id) {
      if (changes.password) {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(changes.password, salt);
        changes.password = hashedPassword;
      }
      let user = await this.models.users.findOneAndUpdate({_id: _id, deletedAt: null}, changes, {new: true});
      if (!user) {
        throw this.app.errors.getError(this.app.errors.TYPES.USER_DOESNT_UPDATED)
      }
      user.password = null;
      return user;
  };

  //delete user
  async deleteUser(_id) {
      const benefits = await this.models.benefits.updateMany({}, {$pull: {users: _id}}, {new: true});
      const user = await this.models.users.findOneAndUpdate({_id}, {deletedAt: Date.now()}, {new: true});
      if (!user) {
        throw this.app.errors.getError(this.app.errors.TYPES.USER_NOT_FOUND);
      }
      user.password = null;
      return user;
    }
};

module.exports = UserServices;
