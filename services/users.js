const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserServices {
  constructor (models, app) {
    this.models = models;
    this.app = app;
  };

  //find user by id
  async getUser (user, _id) {
    // if (user.role !== 'admin' && user.role !== 'hr' && !user._id.equals(_id)) {
    //   throw this.app.errors.getError(this.app.errors.TYPES.PERMISSION);
    // };
    let principal = await this.models.users.findOne({_id: _id, deletedAt: null}, {password: 0});
    if (!principal) {
      throw this.app.errors.getError(this.app.errors.TYPES.USER_NOT_FOUND);
    }
    return principal;
  };

  async getUsers () {
    let users = await this.models.users.find({deletedAt: null}, {password: 0});
    if (!users || users.length === 0) {
      throw this.app.errors.getError(this.app.errors.TYPES.USER_NOT_FOUND);
    }
    return users;
  }

  // all users that have benefits
  async usersBenefits (user1) {
    // if (user.role !== 'admin' && user.role !== 'hr') {
    //   throw this.app.errors.getError(this.app.errors.TYPES.USER_NOT_FOUND);
    // };
      let users_id = await this.models.benefitsHystory.distinct('user_id');
      let users = await this.models.users.find({_id: {$in: users_id}, deletedAt: null}, {password: 0});
      if (!users || users.length === 0) {
        throw this.app.errors.getError(this.app.errors.TYPES.USER_NOT_FOUND);
      }
      return users;

  }

  //create user
  async createUser (userObject) {
      let user = await this.models.users.findOne({email: userObject.email, deletedAt: null});
      console.log(user);
      if (user) {
        throw this.app.errors.getError(this.app.errors.TYPES.REGISTERED_EMAIL);
      }
      let newUser = new this.models.users(userObject);

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, async (err, hash) => {
          if (err) {
            throw err;
          }
          newUser.password = hash;
          return await newUser.save();
        });
      });
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
    // if (user.role !== 'admin' && user.role !== 'hr' && !user._id.equals(_id)) {
    //   throw this.app.errors.getError(this.app.errors.TYPES.PERMISSION);
    // };
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
    // if (user.role !== 'admin' && user.role !== 'hr' && !user._id.equals(_id)) {
    //   throw this.app.errors.getError(this.app.errors.TYPES.PERMISSION);
    // };
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
