import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const benefitHistorySchema = new Schema({
  user_id: {type: Schema.Types.ObjectId,  ref: 'users'},
  benefit_id: {type: Schema.Types.ObjectId, ref: 'benefits'},
  deletedAt: {type: Date, default: null}
},
{
  timestamps: {createdAt: 'created_at'}
});

export default mongoose.model('benefit_histories', benefitHistorySchema);
