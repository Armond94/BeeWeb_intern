import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const candidateSchema = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true},
  birthday: {type: String, required: true},
  phoneNumber: {type: Number, required: true},
  education: {type: String, required: true},
  selected: {type: String, default: false},
  deletedAt: {type: Date, default: null},
  position: {type: Schema.Types.ObjectId, ref: 'positions'}
  // cv: {type: Buffer, required: true}
},
{
  timestamps: {createdAt: 'created_at'}
});

export default mongoose.model('candidates', candidateSchema);
