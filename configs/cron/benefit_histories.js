import cron from 'node-cron';
import benefit_histories from '../../models/benefit_histories';
import mongoose from 'mongoose';


cron.schedule('* * * * *', async () => {
  console.log('benefit_histories cron');
});
