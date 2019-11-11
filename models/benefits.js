import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const benefitSchema = new Schema({
  //created
  //last update
  //deleted
  title: {type: String, required: true},
  description: {type: String, required: true}
});

module.exports = mongoose.model('benefits', benefitSchema);
