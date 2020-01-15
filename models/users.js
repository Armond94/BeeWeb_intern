import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
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
  notification_token: {type: String, default: null}
},
{
  timestamps: {createdAt: 'created_at'}
});

export default mongoose.model('users', userSchema);
