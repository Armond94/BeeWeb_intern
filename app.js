//home_work branch (third time)
import express from 'express';
import bodyParser from 'body-parser';
import Errors from './errors/index';
import ROUTES from './routers/index';
import MODELS from './models/index';
import SERVICES from './services/index';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
const app = express();
app.errors = new Errors();
app.use(cors());

const swaggerDefinition = {
  info: {
    title: 'Swagger API',
    version: '1.0.0',
    description: 'Endpoints to test the routers',
  },
  host: 'localhost:3000',
  basePath: '/',
  securityDefinitions: {
    bearerAuth: {
      type: 'token',
      name: 'Authorization',
      scheme: 'bearer',
      in: 'header',
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ['./swagger_docs/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//connect mongo
process.env.NODE_ENV || (process.env.NODE_ENV = 'dev');
require(`./configs/${process.env.NODE_ENV}.js`);

//bodyParser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.models = {
  users: MODELS.usersModel,
  tickets: MODELS.ticketsModel,
  benefits: MODELS.benefitsModel,
  positions: MODELS.positionsModel,
  candidates: MODELS.candidatesModel,
  benefits_histories: MODELS.benefits_historiesModel
};

// services
app.services = {
  users: new SERVICES.UsersServices(app.models, app),
  tickets: new SERVICES.TicketsServices(app.models, app),
  benefits: new SERVICES.BenefitsServices(app.models, app),
  positions: new SERVICES.PositionsServices(app.models, app),
  candidates: new SERVICES.CandidatesServices(app.models, app)
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
app.use('/users', ROUTES.userRouter);
app.use('/benefits', ROUTES.benefitRouter);
app.use('/positions', ROUTES.positionRouter);
app.use('/candidates', ROUTES.candidateRouter);
app.use('/tickets', ROUTES.ticketRouter);

!process.env.PORT && (process.env.PORT = 3000);
app.listen(process.env.PORT, () => console.log(`server is listen on port ${process.env.PORT}`));
