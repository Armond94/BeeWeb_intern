import cron from 'node-cron';
import candidates from '../../models/candidates';
import mongoose from 'mongoose';


cron.schedule('* * * * *', async () => {
  console.log('candidates cron');
});
