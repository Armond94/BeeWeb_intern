import cron from 'node-cron';
import userModel from '../../models/users';

const userCron1 = cron.schedule('0 0 0 * * *', async () => {
  let from = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`;

  if (users && users.length > 0) {
    let users = await userModel.updateMany({created_at: {$gte: from}, deletedAt: null}, {$inc: {dayOff: 1}});
  }
});

export { userCron1 };
