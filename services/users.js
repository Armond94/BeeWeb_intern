import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import jwtConfigs from '../configs/jwt_configs';
import mongoose from "mongoose";
import {DEFAULT_LIMIT, DEFAULT_OFFSET} from '../configs/constants';

export default class UserServices {
  constructor (models, app) {
    this.models = models;
    this.app = app;
  };

  //find user by id
  async getUser (_id) {
    let user = await this.models.users.findOne({_id: _id, deletedAt: null}, {password: 0})
      .populate('tickets');
    if (!user) {
      throw new Error('User not found.');
    }
    return user;
  }

  //find users
  async getUsers (query, limit = DEFAULT_LIMIT, offset = DEFAULT_OFFSET) {
    let users = await this.models.users.find(query, {password: 0}).limit(limit).skip(offset)
      .populate('tickets');
    if (!users || users.length === 0) {
      throw new Error();
    }
    return users;
  }

  // all users that have benefits
  async usersBenefits () {
      let users_id = await this.models.benefit_histories.distinct('user_id');
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
  }

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
        const token = jwt.sign({email: email, userId: user._id}, process.env.JWT_KEY || jwtConfigs.key, { expiresIn: jwtConfigs.tokenLife});
        const refreshToken = jwt.sign({email: email, userId: user._id}, process.env.REFRESH_TOKEN_KEY || jwtConfigs.refreshTokenKey, { expiresIn: jwtConfigs.refreshTokenLife});
        user.password = null;
        return resolve({user, token, refreshToken});
      });
    });
  }

  //refresh token
  async refreshToken (refresh_token, email) {
    let user = await this.models.users.findOne({email: email, deletedAt: null});
    if (!user) {
      throw new Error();
    }
    if(!refresh_token) {
      throw new Error();
    }
    const token = jwt.sign({email: email, userId: user._id}, process.env.JWT_KEY || jwtConfigs.key, { expiresIn: jwtConfigs.tokenLife});
    const refreshToken = jwt.sign({email: email, userId: user._id}, process.env.REFRESH_TOKEN_KEY || jwtConfigs.refreshTokenKey, { expiresIn: jwtConfigs.refreshTokenLife});
    return { token, refreshToken };
  }

  //update user
  async updateUser (changes, _id) {
      if (changes.password) {
        const salt = bcrypt.genSaltSync(10);
        changes.password = bcrypt.hashSync(changes.password, salt);
      }
      let user = await this.models.users.findOneAndUpdate({_id: _id, deletedAt: null}, changes, {new: true});
      if (!user) {
        throw new Error();
      }
      user.password = null;
      return user;
  }

  // logout
  async logout (_id, token) {
    let user = await this.updateUser({_id, deletedAt: null}, {$pull: {notification_tokens: token}}, {new: true});
    if (!user) {
      throw new Error('!log out failed');
    }
    return user;
  }

  // chek and create rating object
  async rate (rating, user_id, admin_id) {
    let from = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`;
    let ratingDoc = await this.models.ratings.findOne({user_id, admin_id, created_at: {$gte: from}});

    if (ratingDoc || rating <= 0 || rating > 10) {
      throw new Error('cant rate');
    }

    let newRating = new this.models.ratings({user_id, admin_id, rating});
    return newRating.save();
 }

 // count average rate and update user
 async updateUserRating (user_id) {
   let ratings = await this.models.ratings.find({user_id}, {rating: 1});

   let object = ratings.reduce((acc, item) => {
     acc[`${item.rating}`] || (acc[`${item.rating}`] = 0);
     acc[`${item.rating}`]++;

     return acc;
   }, {});

   let firstArg = Object.keys(object).reduce((res, el) => res + el * object[el], 0);
   let secondArg = Object.values(object).reduce((sum, el) => sum + el, 0);

   return await this.updateUser({rating: firstArg / secondArg}, user_id);
 }

  // get avatar
  async getAvatar (_id) {
    let user = await this.models.users.findOne({_id}, {avatar: 1});

    if (!user) {
      throw new Error('User not found.');
    }

    return this.app.services.upload.getFile(user.avatar);
  }

  async removeAvatar (_id) {
    let user = await this.models.users.findOne({_id, deleted: null}, {avatar: 1});

    if (!user) {
      throw new Error('User not found.');
    }

    let result = await this.app.services.upload.removeFile(user.avatar);

    if (!result) {
      throw new Error('Remove avatar error.');
    }

    await this.models.users.findOneAndUpdate({_id, deleted: null}, {avatar: null}, {new: true});
  }

  //delete user
  async deleteUser (_id) {
      const benefits = await this.models.benefits.updateMany({}, {$pull: {users: _id}}, {new: true});
      const user = await this.models.users.findOneAndUpdate({_id: _id, deletedAt: null}, {deletedAt: Date.now()}, {new: true});
      if (!user) {
        throw new Error();
      }
      user.password = null;
      return user;
    }
};
