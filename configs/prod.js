const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

mongoose.connect(`mongodb://${process.env.mongo_host}:${process.env.mongo_port}/beeweb_intern`, {useNewUrlParser: true, useUnifiedTopology: true}, err => {
  if (err) {
    throw err;
  };

  console.log('successfuly connected');
});
