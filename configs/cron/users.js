import cron from 'node-cron';
import userModel from '../../models/users';
var request = require('request');

const userCron1 = cron.schedule('0 0 0 * * *', async () => {
//   var postData = {
//     "notification": {
//            "title": "FCM Message",
//            "body": "This is an FCM Message",
//            "icon": "/ab-logo.png",
//       }
//   };
//
//  function updateClient(postData){
//   var clientServerOptions = {
//       "uri": "https://fcm.googleapis.com/fcm/send",
//       "data": {
//           "notification": {
//               "title": "FCM Message",
//               "body": "This is an FCM Message",
//               "icon": "/ab-logo.png"
//           }
//         },
//       "method": "POST",
//       "headers": {
//         "Authorization": "key=AAAANPX4N_0:APA91bFYhajwQ4kQH4P9Dz0fALT63zozu9cPlfLC1mcLDcdtfzmGUXZ2Y0sdaqEIWvOxQrsAncqUtQZFi133LfUM8nqRIbFbIFdw9GfFA6SvuqKoMHio1Pnp4pvCSCJoLbVmxPaFn-_8",
//         "Content-Type": "application/json",
//         "Content-Type": "application/json"
//       }
//   };
//
//   request(clientServerOptions, function (error, response) {
//       console.log(error,response.body);
//       return;
//   });
// };
// updateClient(postData);
});

export { userCron1 };
//   "data": {
//     "notification": {
//         "title": "FCM Message",
//         "body": "This is an FCM Message",
//         "icon": "/ab-logo.png",
//     }
//   },
//   "to": "fXg0ToRPmcY:APA91bFx5rBREhg5A27G-DFQwRLz2D20JvTcg1_INeOhnRSgHi3Z9s4xouuG-Y1ZbBYGlDv8L4Bi5T7jZYDvwQEnx_LnxDkMPD-vpFsdpvZie-RXwccUiVAucjVsoZZJ3C1BPd-4nfX-"
// }' https://fcm.googleapis.com/fcm/send








// const userCron1 = cron.schedule('0 0 0 * * *', async () => {

// let from = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`;
//
// if (users && users.length > 0) {
//   let users = await userModel.updateMany({created_at: {$gte: from}, deletedAt: null}, {$inc: {dayOff: 1}});
// }
