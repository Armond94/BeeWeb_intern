import cron from 'node-cron';
import userModel from '../models/users';
import request from 'request';

//increment staff dayoff every mounth
const addDayOffMountly = cron.schedule('0 0 0 * * *', async () => {
  let from = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`;

  if (users && users.length > 0) {
    let users = await userModel.updateMany({created_at: {$gte: from}, deletedAt: null}, {$inc: {dayOff: 1}});
  }
});

//send notification to admin (notify that today is someone birthday)
const notifyBirthday = cron.schedule('0 0 0 * * *', async () => {
  let birthday = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`;
  let user = await userModel.find({deletedAt: null, birthday});
  let admin = await userModel.findOne({deletedAt: null, role: 'admin'});

  if (admin && user) {
      let options = {
      "headers": {
        "Authorization": "key=AAAANPX4N_0:APA91bFYhajwQ4kQH4P9Dz0fALT63zozu9cPlfLC1mcLDcdtfzmGUXZ2Y0sdaqEIWvOxQrsAncqUtQZFi133LfUM8nqRIbFbIFdw9GfFA6SvuqKoMHio1Pnp4pvCSCJoLbVmxPaFn-_8",
        "Content-Type": "application/json"
      },
      "body": `{
        "notification": {
            "title": "birthday",
            "body": "today is ${user.firstName} birthday",
            "icon": "/ab-logo.png"
        },
        "to": "${admin.notification_token}",
      }`
    };

    request.post("https://fcm.googleapis.com/fcm/send", options, function (error, response) {
      console.log(error, response);
      return;
    });
  }
});

export default {
  addDayOffMountly,
  notifyBirthday
};
