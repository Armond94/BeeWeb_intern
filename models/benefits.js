const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const benefitSchema = new Schema({
  title: {type: String, required: true},
  description: {type: String, required: true}
},
{
  timestamps: {createdAt: 'created_at'}
});

module.exports = mongoose.model('benefits', benefitSchema);
