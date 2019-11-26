import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const benefitsHistorySchema = new Schema({
  user_id: {type: Schema.Types.ObjectId,  ref: 'users'},
  benefit_id: {type: Schema.Types.ObjectId, ref: 'benefits'}
},
{
  timestamps: {createdAt: 'created_at'}
});

export default mongoose.model('benefits_histories', benefitsHistorySchema);
