import jwt from 'jsonwebtoken';
import users from '../models/users';
import mongoose from 'mongoose';

export default class Auth {

  async checkToken (req, res, next) {
    try {
      const token = (req.headers.authorization || '').split(' ')[1];

      if (!token) {
        throw new Error('authorization failed, please provide token');
      }

      const decoded = jwt.verify(token, process.env.JWT_KEY);

      if (!decoded) {
        throw new Error('invalid token');
      }

      req.user = await users.findOne({_id: decoded.userId, deletedAt: null});
      next();
    } catch (err) {
      return res.status(401).send(err.message);
    }

  };

  async checkRefreshToken (req, res, next) {
    try {
      const refreshToken = (req.body.refreshToken || '').split(' ')[1];
      if (!refreshToken) {
        throw new Error('authorization failed, please provide refreshToken');
      }

      const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);

      if (!decoded) {
        throw new Error('authorization failed, invalid refreshToken');
      }

      req.user = await users.findOne({_id: decoded.userId, deletedAt: null});
      next();
    } catch (err) {
      return res.status(401).send(err.message);
    }
  };

};
