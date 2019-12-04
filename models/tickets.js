import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
  userId: {type: Schema.Types.ObjectId, required: true, ref: 'users'},
  description: {type: String, required: true},
  startDate:{type: String, required: true},
  endDate: {type: String, required: true},
  confirmed: {type: Boolean, default: false},
  deletedAt: {type: Date, default: null}
},
{
  timestamps: {createdAt: 'created_at'}
});

export default mongoose.model('tickets', ticketSchema);
