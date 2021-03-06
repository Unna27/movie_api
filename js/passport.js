import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import passportJWT from 'passport-jwt';
import { User } from '../models/user.js';

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

/** define LocalStrategy for HTTP authentication
 *   @args username and passwordfield.
 *   @function takes 2 args(username and password from API req URL) and callback ref
 *   @callback has three args(err,userobj,message to be returned)
 *   @returns user object and a successsful login message, else error
 */
passport.use(
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password'
    },
    (username, password, callback) => {
      console.log(username + '-' + password);
      // check in Mongo db User collection
      User.findOne({ username: username })
        .then(user => {
          if (!user) {
            console.log('Incorrect username');
            return callback(null, false, {
              message: 'Incorrect username.'
            });
          }
          if (!user.validatePassword(password)) {
            console.log('Incorrect password.');
            return callback(null, false, {
              message: 'Incorrect password.'
            });
          }
          console.log('Logged in successfully.');
          console.log(user + ' in local starategy');
          return callback(null, user, { message: 'Logged in successfully' });
        })
        .catch(error => {
          console.log(error);
          return callback(error);
        });
    }
  )
);

/** define JWTStrategy for json web token
 *   @args token and secret key
 *   @function checks if the token is valid
 *  @returns user object if successful, else error
 */
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'myflix_jwt_secret'
    },
    (jwtPayload, callback) => {
      User.findById(jwtPayload._id)
        .then(user => {
          console.log('user authenticated' + user);
          return callback(null, user);
        })
        .catch(error => {
          console.log('user not authenticated' + error);
          return callback(error);
        });
    }
  )
);
