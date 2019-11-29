import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default class UserServices {
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

  //find users
  async getUsers (query) {
    let users = await this.models.users.find(query.search, {password: 0}).limit(parseInt(query.limit)).skip(parseInt(query.offset));
    if (!users || users.length === 0) {
      throw new Error();
    }
    return users;
  }

  // all users that have benefits
  async usersBenefits () {
      let users_id = await this.models.benefits_hystory.distinct('user_id');
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
        throw new Error();
      }
      const salt = bcrypt.genSaltSync(10);
      userObject.password = bcrypt.hashSync(userObject.password, salt);

      if (user && user.deletedAt != null) {
        userObject.deletedAt = null;
        let result = await this.models.users.findOneAndUpdate({_id: user._id}, userObject, {new: true});
        if (!result) {
          throw new Error();
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
      throw new Error();
    }
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          return reject(err);
        }
        if (!isMatch) {
           return reject('login failed');
        }
        const token = jwt.sign({email: email, userId: user._id}, process.env.JWT_KEY || 'secret', { expiresIn: '24h'});
        user.password = null;
        return resolve({user, token});
      });
    });
  };

  //change user
  async updateUser (changes, _id) {
      if (changes.password) {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(changes.password, salt);
        changes.password = hashedPassword;
      }
      let user = await this.models.users.findOneAndUpdate({_id: _id, deletedAt: null}, changes, {new: true});
      if (!user) {
        throw new Error();
      }
      user.password = null;
      return user;
  };

  //delete user
  async deleteUser(_id) {
      const benefits = await this.models.benefits.updateMany({}, {$pull: {users: _id}}, {new: true});
      const user = await this.models.users.findOneAndUpdate({_id: _id, deletedAt: null}, {deletedAt: Date.now()}, {new: true});
      if (!user) {
        throw new Error();
      }
      user.password = null;
      return user;
    }
};
// export default UserServices;
