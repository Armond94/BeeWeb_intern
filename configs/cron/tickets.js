import cron from 'node-cron';
import tickets from '../../models/tickets';
import mongoose from 'mongoose';


cron.schedule('* * * * *', async () => {
  console.log('tickets cron');
});
