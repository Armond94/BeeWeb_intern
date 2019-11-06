const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  //created
  //lastupdate
  //deleted
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  role: {type: String, required: true},
  //birthday change to Date
  birthday: {type: String, required: true},
  //phoneNumber change to Number
  phoneNumber: {type: String, required: true},
  // salary: {type: Number, default: 0},
  // attendance: {type: Number, default: 0},
  // avatar: {type: String, required: true},
  password: {type: String, required: true}
});

module.exports = mongoose.model('users', userSchema);
