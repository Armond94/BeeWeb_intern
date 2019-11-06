const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
//'mongodb://localhost:27017/beeweb_intern'
mongoose.connect('mongodb://beeweb_insterns:beeweb_insterns12345@ds059722.mlab.com:59722/beeweb_intern', {useNewUrlParser: true, useUnifiedTopology: true}, err => {
  if (err) {
    throw err;
  };

  console.log('successfuly connected to dev db');
});
