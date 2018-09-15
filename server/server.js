// DEPENDENCIES

const //CONTROLLERS
  auth0Controller  = require('./controllers/auth0Controller'),
  widgetController = require('./controllers/widgetController'),
  apiController    = require('./controllers/apiController'),
  //NODE MODULES
  express          = require('express'),
  session          = require('express-session'),
  bodyParser       = require('body-parser'),
  massive          = require('massive')
                     require('dotenv').config();

//SERVER SETUP
const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env;
const app = express();

//MIDDLEWARE
app.use (express.static(`${__dirname}/../build`));
app.use (bodyParser.json());
app.use (session({ secret: SESSION_SECRET, resave: false, saveUninitialized: false }));

//AUTH0 ENDPOINTS
app.get    ('/auth/callback',      auth0Controller.auth  );
app.get    ('/api/user-data',      auth0Controller.user  );
app.get    ('/api/logout',         auth0Controller.logout);
app.delete ('/api/purge/:user_id', auth0Controller.purge );

//WIDGET ENDPOINTS
app.get    ('/widget/:user_id',            widgetController.read    );
app.post   ('/widget/:user_id',            widgetController.create  );
app.put    ('/widget/position/:master_id', widgetController.position);
app.put    ('/widget/settings/:master_id', widgetController.settings);
app.delete ('/widget/:master_id',          widgetController.delete  );

//API ENDPOINTS
app.post('/api/dictionary', apiController.dictionary);
app.post('/api/weather', apiController.weather);
app.put('/api/vibrant', apiController.vibrant);
app.put('/api/unsplash/:user_id', apiController.unsplash);
app.post('/api/getcurency', apiController.getcurency);
app.post('/api/getplaces', apiController.getplaces);
//RUN THE SERVER
massive(CONNECTION_STRING).then(db => {
  app.set('db', db);
  app.listen(SERVER_PORT, () => console.log(`server started on port ${SERVER_PORT}`));
});