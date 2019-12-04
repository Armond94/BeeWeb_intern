import cron from 'node-cron';
import benefits from '../../models/benefits';
import mongoose from 'mongoose';


cron.schedule('* * * * *', async () => {
  console.log('benefits cron');
});
