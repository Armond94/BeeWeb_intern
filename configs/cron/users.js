import cron from 'node-cron';
import users from '../../models/users';
import mongoose from 'mongoose';


cron.schedule('* * * * *', async () => {
  let users = await users.updateMany({}, { $inc: { dayOff: 1 } });
});
