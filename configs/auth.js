const jwt = require('jsonwebtoken');
const users = require('../models/users');
const mongoose = require('mongoose');

module.exports = async (req, res, next) => {
  try {
    console.log('111111111', req.headers.authorization);
    if (!req.headers.authorization) {
      throw new Error('!sing in');
    }
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    console.log('2222222222', req.headers.authorization);
    if (!decoded) {
      throw new Error('!sing in');
    }
    let user = await users.findOne({_id: decoded.userId, deletedAt: null});
    console.log('33333333', req.headers.authorization);

    req.user = user;
    next();
  } catch (err) {
    return res.send(err.message);
  }
}
