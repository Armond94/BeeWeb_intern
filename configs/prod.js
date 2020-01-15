import mongoose from 'mongoose';

mongoose.set('useFindAndModify', false);

try {
  mongoose.connect(`mongodb://${process.env.MONGO_CONN_STRING}/beeweb_intern`, {useNewUrlParser: true, useUnifiedTopology: true}, err => {
    if (err) {
      throw err;
    };
    console.log('successfuly connected to production db');
  });
} catch (err) {
  console.log(err.message);
}
