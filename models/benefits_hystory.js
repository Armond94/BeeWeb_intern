const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const benefitsHystorySchema = new Schema({
  user_id: {type: Schema.ObjectId},
  benefit_id: {type: Schema.ObjectId}
},
{
  timestamps: {createdAt: 'created_at'}
});

module.exports = mongoose.model('benefits_hystory', benefitsHystorySchema);
