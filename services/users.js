import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class UserServices {
  constructor (models, app) {
    this.models = models;
    this.app = app;
  };

  //find user by id
  async getUser (reqUser, _id) {
    if (user.role !== 'admin' && user.role !== 'hr' && !user._id.equals(_id)) {
      // throw this.app.errors.getError(this.app.errors.TYPES.PERMISSION);
      throw new Error('!you dont have such permission');
    };
    let principal = await this.models.users.findOne({_id: _id, deletedAt: null}, {password: 0});
    if (!principal) {
      // throw this.app.errors.getError(this.app.errors.TYPES.USER_NOT_FOUND);
      throw new Error('!user not found');
    }
    return principal;

  };

  // all users that have benefits
  async usersBenefits (user1) {
    if (user1.role === 'admin' || user1.role === 'hr') {
      let users_id = await this.models.benefitsHystory.distinct('user_id');
      let users = await this.models.users.find({_id: {$in: users_id}, deletedAt: null}, {password: 0});
      if (!users || users.length === 0) {
        throw new Error('!users not found');
      }
      return users;
    };
    throw new Error('!you dont have such permission');
  }

  //create user
  async createUser (user1, userObject) {
    // if (user.role === 'admin' || user.role === 'hr') {
      let user = await this.models.users.findOne({email: userObject.email});
      if (user) {
        throw new Error('email is already registered');
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
    // };
    // throw new Error('!you dont have permission');
  };

  //signin
  async login (email, password) {
    let user = await this.models.users.findOne({email: email, deletedAt: null});
    if (!user) {
      throw new Error('!authenticate failed');
    }
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err || !isMatch) {
          return reject(err || new Error('!password incorect'));
        }
        const token = jwt.sign({email: email, userId: user._id}, process.env.JWT_KEY || 'secret', { expiresIn: '1h'});
        user.password = null;
        return resolve({user, token});
      });
    });
  };

  //change user
  async changeUser (user, obj, _id) {
    if (user.role === 'admin' || user.role === 'hr' || user._id.equals(_id)) {
      if (obj.password) {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(obj.password, salt);
        obj.password = hashedPassword;
      }
      const user = await this.models.users.findOneAndUpdate({_id: _id, deletedAt: null}, obj, {new: true});
      if (!user) {
        throw new Error('!user doesnt updated')
      }
      user.password = null;
      return user;
    }
    throw new Error('!you dont have such permission');
  };

  //delete user
  async deleteUser(_id) {
    if (user.role === 'admin' || user.role === 'hr' || user._id.equals(_id)) {
      const benefits = await this.models.benefits.updateMany({}, {$pull: {users: _id}}, {new: true});
      const user = await this.models.users.findOneAndUpdate({_id}, {deletedAt: Date.now()}, {new: true});
        if (!user) {
          throw new Error('!user not found');
        }
        user.password = null;
        return user;
    }
    throw new Error('!you dont have such permission');
  }
};

module.exports = UserServices;
