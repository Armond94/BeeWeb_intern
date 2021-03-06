import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const benefitSchema = new Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  deletedAt: {type: Date, default: null}
},
{
  timestamps: {createdAt: 'created_at'}
});

export default mongoose.model('benefits', benefitSchema);
