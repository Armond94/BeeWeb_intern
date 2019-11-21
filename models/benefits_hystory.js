import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const benefitsHystorySchema = new Schema({
  user_id: {type: Schema.ObjectId},
  benefit_id: {type: Schema.ObjectId}
},
{
  timestamps: {createdAt: 'created_at'}
});

export default mongoose.model('benefits_hystory', benefitsHystorySchema);
