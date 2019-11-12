import jwt from 'jsonwebtoken';
import users from '../models/users';
import mongoose from 'mongoose';

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    console.log(token);
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    if (!decoded) {
      throw new Error('!sing in');
    }
    let user = await users.findOne({_id: decoded.userId, deletedAt: null});
    console.log(user);
    req.user = user;
    next();
  } catch (err) {
    res.send(err.message);
  }
}
