import mongoose from 'mongoose';

mongoose.set('useFindAndModify', false);

mongoose.connect('mongodb://localhost:27017/beeweb_intern', {useNewUrlParser: true, useUnifiedTopology: true}, (err, db) => {
  if (err) {
    throw err;
  };
  console.log('successfuly connected to dev db');
});
