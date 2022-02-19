/**
 * This API has been built using Node.js and Express
 * Data is stored in Mongo db
 * Business Logic is modelled using Mongoose
 * Middleware modules - morgan for logging, bodyParser for handling data in the requests has been used
 */

import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import { port, mongodb_uri } from './config/config.js'; // import dbconfig variables
import passport from 'passport'; // import passport module
import './js/passport.js'; // import passport.js file
import { authCheck } from './routers/auth.js'; // import auth.js
import { user_Router } from './routers/users.js'; // import users route
import { movie_Router } from './routers/movies.js'; // import movies route
import { director_Router } from './routers/directors.js'; // import directors route

// Connect to Mongodb
mongoose.connect(mongodb_uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const app = express();

//call middlewares
app.use(morgan('common')); // use morgan framework to use logging function
app.use(bodyParser.json()); //  looks at requests where the Content-Type: application/json header is present and transforms the text-based JSON input into JS-accessible variables under req.body.
app.use(bodyParser.urlencoded({ extended: true })); // Looks at URL encoded requests and does the same as above. extended: true mentions req.body obj contains any values instead of just strings.

app.use(passport.initialize()); // reqd for req.login function in auth.js to work
app.use(cors()); // by default allows all origins

authCheck(app);

//serve static files in public folder
app.use(express.static('public'));
/*
app.get("/documentation", (req, res) => {
res.sendFile("public/documentation.html", {
root: __dirname
});
});
*/

// use http method GET to send response
app.get('/', (req, res) => {
  res.send('Welcome to my Movie API!');
});

// call appropriate routers based on the api end point.
app.use('/users', user_Router);
app.use('/movies', movie_Router);
app.use('/directors', director_Router);

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error in central: ' + err);
});

// make the app listen at the env port variable or default 8080
app.listen(port, '0.0.0.0', () => {
  console.log('Movie_API app listening on port ' + port);
});
