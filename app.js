//master branch (second time)
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
//front
const expressLayouts = require('express-ejs-layouts');

//connect mongo
!process.env.NODE_ENV && (process.env.NODE_ENV = 'dev');
require(`./configs/${process.env.NODE_ENV}.js`);

//passport configs
require('./configs/passport')(passport);

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
  users: new (require('./services/users'))(app.models),//users
  benefits: new (require('./services/benefits'))(app.models),
  positions: new (require('./services/positions'))(app.models),
  candidates: new (require('./services/candidates'))(app.models)
};

app.use((req, res, next) => {
  req.app = app;
  next();
});

app.use(bodyParser.urlencoded({extended: false}));

//front
app.use(expressLayouts);
app.set('view engine', 'ejs');

//express session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//routers
app.use('/users', require('./routers/users'));
app.use('/benefits', require('./routers/benefits'));
app.use('/positions', require('./routers/positions'));
app.use('/candidates', require('./routers/candidates'));
app.use('/', require('./routers/index.js'));


!process.env.PORT && (process.env.PORT = 3000);
app.listen(process.env.PORT, () => console.log(`server is listen on port ${process.env.PORT}`));
