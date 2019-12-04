import cron from 'node-cron';
import positions from '../../models/positions';
import mongoose from 'mongoose';


cron.schedule('* * * * *', async () => {
  console.log('positions cron');
});
