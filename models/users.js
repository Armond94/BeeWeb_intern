import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {type: String, required: true, order: 1},
  lastName: {type: String, required: true, order: 2},
  email: {type: String, required: true, unique: true},
  role: {type: String, required: true},
  birthday: {type: String, required: true},
  phoneNumber: {type: Number, required: true},
  salary: {type: Number, default: 0},
  password: {type: String, required: true},
  avatar: {type: String, default: null},
  deletedAt: {type: Date, default: null},
  dayOff: {type: Number, default: 0},
  rating: {type: Number, default: 0},
  tickets: [{type: Schema.Types.ObjectId, ref: 'tickets'}],
  notification_tokens: [{type: String}]
},
{
  timestamps: {createdAt: 'created_at'}
});

export default mongoose.model('users', userSchema);
