//home_work branch (third time)
import express from 'express';
import http from 'http';
import ws from 'ws';
import bodyParser from 'body-parser';
import Errors from './errors/index';
import ROUTES from './routers/index';
import MODELS from './models/index';
import SERVICES from './services/index';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerOptions from './configs/swagger_configs';
import swaggerUi from 'swagger-ui-express';
import cron from './configs/usersCron';
import methodOverride from 'method-override';
import cors from 'cors';

const app = express();
const server = http.createServer(app);
const wss = new ws.Server({ server });

app.errors = new Errors();
app.use(cors());

const swaggerSpec = swaggerJSDoc(swaggerOptions.options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//connect mongo
process.env.NODE_ENV || (process.env.NODE_ENV = 'dev');
require(`./configs/${process.env.NODE_ENV}.js`);

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.models = {
  users: MODELS.usersModel,
  ratings: MODELS.ratingsModel,
  tickets: MODELS.ticketsModel,
  benefits: MODELS.benefitsModel,
  positions: MODELS.positionsModel,
  candidates: MODELS.candidatesModel,
  benefit_histories: MODELS.benefit_historiesModel
};

// services
app.services = {
  count: new SERVICES.Count(app.models),
  users: new SERVICES.UsersServices(app.models, app),
  tickets: new SERVICES.TicketsServices(app.models, app),
  benefits: new SERVICES.BenefitsServices(app.models, app),
  positions: new SERVICES.PositionsServices(app.models, app),
  candidates: new SERVICES.CandidatesServices(app.models, app),
  benefit_histories: new SERVICES.BenefitHistoriesServices(app.models, app),
  upload: new SERVICES.UploadService()
};

app.use((req, res, next) => {
  req.app = app;
  next();
});

//test endpoint for homepage
app.get('/', (req, res) => {
  res.send('beeWeb-hr-service');
});

//routers
app.use('/users', ROUTES.userRouter);
app.use('/tickets', ROUTES.ticketRouter);
app.use('/benefits', ROUTES.benefitRouter);
app.use('/positions', ROUTES.positionRouter);
app.use('/candidates', ROUTES.candidateRouter);
app.use('/benefit/histories', ROUTES.benefit_histories);

let connections = new Map();
wss.on('connection', async (ws, incoming_request) => {
  try {
    const userId = incoming_request.url.split('?').id;

    if (!userId) {
      ws.send(JSON.stringify({status: 'error', message: 'id does not provided.'}));
      ws.close();//TODO: check how to close connection
    }

    await app.services.users.getUser(userId);

    ws.user_id = userId;
    connections.set(userId, ws);

    ws.on('message', (message) => {
      console.log('message  - ', message);
      ws.send('data');
    });

    ws.on('close', () => {
      connections.delete(ws.user_id);
    }); //TODO: check close event
  } catch (err) {
    console.log(err.message);
  }
});

!process.env.PORT && (process.env.PORT = 3000);
server.listen(process.env.PORT, () => console.log(`server is listen on port ${process.env.PORT}`));
