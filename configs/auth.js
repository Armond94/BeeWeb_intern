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
    console.log('token', token);
    console.log('decoded', decoded);
    if (!decoded) {
      console.log('auth error', decoded);
      throw new Error('!sing in');
    }
    let user = await users.findOne({_id: decoded.userId, deletedAt: null});
    
    req.user = user;
    next();
  } catch (err) {
    return res.send(err.message);
  }
}
