//home_work branch (third time)
import express from 'express';
import bodyParser from 'body-parser';
import Errors from './errors/errors';
const app = express();

//connect mongo
process.env.NODE_ENV || (process.env.NODE_ENV = 'dev');
require(`./configs/${process.env.NODE_ENV}.js`);

//bodyParser
app.use(bodyParser.urlencoded({extended: false}));
app.errors = new Errors();


// models
app.models = {
  users: require('./models/users'),
  benefits: require('./models/benefits'),
  positions: require('./models/positions'),
  candidates: require('./models/candidates'),
  benefitsHystory: require('./models/benefitsHystory')
};

// services
app.services = {
  users: new (require('./services/users'))(app.models, app),
  benefits: new (require('./services/benefits'))(app.models, app),
  positions: new (require('./services/positions'))(app.models, app),
  candidates: new (require('./services/candidates'))(app.models, app)
};

app.use((req, res, next) => {
  req.app = app;
  next();
});

app.get('/', (req, res) => {
  res.send('hello world');
});

//routers
app.use('/users', require('./routers/users'));
app.use('/benefits', require('./routers/benefits'));
app.use('/positions', require('./routers/positions'));
app.use('/candidates', require('./routers/candidates'));
// app.use('/', require('./routers/index.js'));

app.use((err, req, res, next) => {
  return res.status(400).send(err.message);
});

!process.env.PORT && (process.env.PORT = 3000);
app.listen(process.env.PORT, () => console.log(`server is listen on port ${process.env.PORT}`));
