const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const positionSchema = new Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  type: {type: String, required: true},
  required_qualifications: {type: String, required: true},
  deadline: {type: Date, default: null},
  candidates: [{type: Schema.ObjectId, ref: 'candidates'}]
},
{
  timestamps: {createdAt: 'created_at'}
});

module.exports = mongoose.model('positions', positionSchema);
