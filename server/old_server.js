// DEPENDENCIES

const //CONTROLLERS
      auth0Controller  = require ('./controllers/auth0Controller'),
      userController   = require ('./controllers/userController'),
      widgetController = require ('./controllers/widgetController'),
      stripeController = require ('./controllers/stripeController'),
      //NODE MODULES
      express          = require ('express'),
      session          = require ('express-session'),
      bodyParser       = require ('body-parser'),
      massive          = require ('massive')
                         require ('dotenv').config();

//SERVER SETUP
const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env;
const app = express();

//MIDDLEWARE
app.use (express.static(`${__dirname}/../build`));
app.use (bodyParser.json());
app.use (session({secret: SESSION_SECRET, resave: false, saveUninitialized: false}));
massive (CONNECTION_STRING).then(db => app.set('db', db));

//WIDGET ENDPOINTS
app.get  ('/widget/:id', widgetController.read  );
app.post ('/widget/:id', widgetController.update);

//AUTH0 ENDPOINTS
app.get ('/auth/callback', auth0Controller.auth  );
app.get ('/api/user-data', auth0Controller.user  );
app.get ('/api/logout',    auth0Controller.logout);

//RUN THE SERVER
app.listen(SERVER_PORT, () => console.log(`server started on port ${SERVER_PORT}`));