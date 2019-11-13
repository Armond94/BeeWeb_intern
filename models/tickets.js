const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
  userId: {type:  Schema.ObjectId, required: true},
  startDate:{type: String, required: true},
  endDate: {type: String, required: true},
  confirmed: {type: Boolean, default: null}
},
{
  timestamps: {createdAt: 'created_at'}
})
