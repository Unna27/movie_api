import jwt from 'jsonwebtoken';
import passport from 'passport';
import '../js/passport.js';

// to authenticate registered users and generate jwt for user
const jwtSecret = 'myflix_jwt_secret';

/**
 *   @args user object
 *   @function generates web token
 *   @returns webtoken
 */

let generateJWTToken = user => {
  return jwt.sign(user, jwtSecret, {
    subject: user.username, // username that is encoded in JWT
    expiresIn: '7d', // specifies duration of token expiry
    algorithm: 'HS256' // algorithm used to encode the JWT
  });
};

// POST login implemented with customercallback function
/**
 *  login endpoint that validates user id and paswword
 *  @returns user object
 */
export const authCheck = router => {
  router.post('/login', (req, res) => {
    passport.authenticate('local', { session: false }, (error, user, info) => {
      // triggers Localstrategy in passport.js and the callback fn gets 3 values (error, user obj, message)
      if (error) {
        console.log('error.');
        return res.status(400).json({
          message: 'Something is not right. ' + info.message
        });
      }
      if (!user) {
        console.log('User or password not correct.');
        return res.status(400).json({
          message: 'User details not correct - ' + info.message,
          user: user
        });
      }
      req.login(user, { session: false }, error => {
        // to login the newly registered user
        if (error) {
          console.log(error);
          res.send(error);
        }
        let token = generateJWTToken(user.toJSON()); // gets the JWTToken
        return res.json({ user, token });
      });
    })(req, res);
  });
};
