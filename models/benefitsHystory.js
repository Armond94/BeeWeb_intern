const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const benefitsHystorySchema = new Schema({
  //created
  //last update
  //deleted
  user_id: {type: Schema.ObjectId},
  benefit_id: {type: Schema.ObjectId}
});

module.exports = mongoose.model('benefitsHystory', benefitsHystorySchema);
