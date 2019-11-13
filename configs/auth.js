const jwt = require('jsonwebtoken');
const users = require('../models/users');
const mongoose = require('mongoose');

module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new Error('!sing in');
    }
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    if (!decoded) {
      throw new Error('!sing in');
    }
    let user = await users.findOne({_id: decoded.userId, deletedAt: null});
    req.user = user;
    next();
  } catch (err) {
    res.send(err.message);
  }
}
