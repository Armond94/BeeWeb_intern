const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  role: {type: String, required: true},
  birthday: {type: String, required: true},
  phoneNumber: {type: Number, required: true},
  salary: {type: Number, default: 0},
  // attendance: {type: Number, default: 0},
  password: {type: String, required: true},
  deletedAt: {type: Date, default: null}
},
{
  timestamps: {createdAt: 'created_at'}
},
{
  retainKeyOrder: true
});

module.exports = mongoose.model('users', userSchema);
