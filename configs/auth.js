import jwt from 'jsonwebtoken';
import users from '../models/users';
import mongoose from 'mongoose';

export default async (req, res, next) => {
  try {
    const token = (req.headers.authorization || '').split(' ')[1];

    if (!token) {
      throw new Error('authorization failed, please provide token');
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY);

    if (!decoded) {
      throw new Error('authorization failed, invalid token');
    }

    let user = await users.findOne({_id: decoded.userId, deletedAt: null});
    req.user = user;
    console.log('111 - auth is');
    next();
  } catch (err) {
    console.log('2222 - auth err');
    return res.status(409).send(err.message);
  }
};
