//home_work branch (third time)
import express from 'express';
import bodyParser from 'body-parser';
import Errors from './errors/index';
import ROUTES from './routers/index';
import cors from 'cors';


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
import usersModel from './models/users';
app.models = {
  users: usersModel,
  benefits: require('./models/benefits'),
  positions: require('./models/positions'),
  candidates: require('./models/candidates'),
  benefits_hystory: require('./models/benefits_hystory'),
  tickets: require('./models/tickets')
};

// services
import UsersServices from './services/users';
import BenefitsServices from './services/benefits';
import PositionsServices from './services/positions';
import CandidatesServices from './services/positions';
import TicketsServices from './services/tickets';
//
app.services = {
  users: new UsersServices(app.models, app),
  benefits: new BenefitsServices(app.models, app),
  positions: new PositionsServices(app.models, app),
  candidates: new CandidatesServices(app.models, app),
  tickets: new TicketsServices(app.models, app)
};

app.use((req, res, next) => {
  req.app = app;
  next();
});

//test endpoint for homepage
app.get('/', (req, res) => {
  res.send('beeWeb-hr-service1');
});
//
// import userRouter from './routers/users';
// import benefitRouter from './routers/benefits';
// import positionRouter from './routers/positions';
// import candidateRouter from './routers/positions';
// import ticketRouter from './routers/tickets';

//routers
app.use('/users', ROUTES.userRouter);
app.use('/benefits', ROUTES.benefitRouter);
app.use('/positions', ROUTES.positionRouter);
app.use('/candidates', ROUTES.candidateRouter);
app.use('/tickets', ROUTES.ticketRouter);

!process.env.PORT && (process.env.PORT = 3000);
app.listen(process.env.PORT, () => console.log(`server is listen on port ${process.env.PORT}`));
