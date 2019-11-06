const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
//`mongodb://${process.env.mongo_host}:${process.env.mongo_port}/beeweb_intern`
mongoose.connect(`mongodb://${process.env.MONGO_CONN_STRING}/beeweb_intern`, {useNewUrlParser: true, useUnifiedTopology: true}, err => {
  console.log(err);
  if (err) {
    throw err;
  };

  console.log('successfuly connected to production db');
});
