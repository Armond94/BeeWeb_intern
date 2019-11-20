//home_work branch (third time)
// import express from 'express';
const express = require('express');
const bodyParser = require('body-parser');
const Errors = require('./errors/index');
const cors = require('cors');
const app = express();


app.use(cors());

//connect mongo
process.env.NODE_ENV || (process.env.NODE_ENV = 'dev');
require(`./configs/${process.env.NODE_ENV}.js`);

//bodyParser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.errors = new Errors();

// models
app.models = {
  users: require('./models/users'),
  benefits: require('./models/benefits'),
  positions: require('./models/positions'),
  candidates: require('./models/candidates'),
  benefitsHystory: require('./models/benefits_hystory'),
  tickets: require('./models/tickets')
};

// services
app.services = {
  users: new (require('./services/users'))(app.models, app),
  benefits: new (require('./services/benefits'))(app.models, app),
  positions: new (require('./services/positions'))(app.models, app),
  candidates: new (require('./services/candidates'))(app.models, app),
  tickets: new (require('./services/candidates'))(app.models, app)
};

app.use((req, res, next) => {
  req.app = app;
  next();
});

//test endpoint for homepage
app.get('/', (req, res) => {
  res.send('beeWeb-hr-service1');
});

//routers
app.use('/users', require('./routers/users'));
app.use('/benefits', require('./routers/benefits'));
app.use('/positions', require('./routers/positions'));
app.use('/candidates', require('./routers/candidates'));
app.use('/tickets', require('./routers/tickets'));

!process.env.PORT && (process.env.PORT = 3018);
app.listen(process.env.PORT, () => console.log(`server is listen on port ${process.env.PORT}`));
