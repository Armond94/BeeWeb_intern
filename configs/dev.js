const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

mongoose.connect('mongodb://localhost:27017/beeweb_intern', {useNewUrlParser: true, useUnifiedTopology: true}, err => {
  if (err) {
    throw err;
  };

  console.log('successfuly connected');
});
