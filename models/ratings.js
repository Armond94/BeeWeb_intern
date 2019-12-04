import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ratingsSchema = new Schema({
  user_id: {type: Schema.Types.ObjectId, ref: 'users'},
  admin_id: {type: Schema.Types.ObjectId, ref: 'users'},
  rating: {type: Number, required: true}
},
{
  timestamps: {createdAt: 'created_at'}
});

export default mongoose.model('ratings', ratingsSchema);
