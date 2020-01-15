let port = process.env.PORT || 3000;

const swaggerDefinition = {
  info: {
    title: 'Swagger API',
    version: '1.0.0',
    description: 'Endpoints to test the routers',
  },
  host: `localhost:${port}`,
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

export default { options };
