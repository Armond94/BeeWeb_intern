import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const positionSchema = new Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  type: {type: String, required: true},
  required_qualifications: {type: String, required: true},
  deadline: {type: String, required: true},
  candidates: [{type: Schema.ObjectId, ref: 'candidates'}],
  deletedAt: {type: Date, default: null}
},
{
  timestamps: {createdAt: 'created_at'}
});

export default mongoose.model('positions', positionSchema);
