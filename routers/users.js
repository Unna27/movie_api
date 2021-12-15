import express from 'express';
import { User } from '../models/user.js'; // import Usermodel
import passport from 'passport'; // import passport module
import '../js/passport.js'; //import passport.js file
import {
  userValidationRules,
  userUpdateValidationRules,
  validate
} from '../middlewares/validators/validator.js'; // import validator

const user_Router = express.Router();

// request to add a new user
user_Router.post('/', userValidationRules(), validate, (req, res, next) => {
  let hashedPassword = User.hashPassword(req.body.password); // calls hashPwd method in usermodel
  User.findOne({ username: req.body.username })
    .then(user => {
      if (user) {
        res.status(400).send(req.body.username + ' already exists');
      } else {
        User.create({
          username: req.body.username,
          password: hashedPassword,
          email: req.body.email,
          birthdate: req.body.birthdate
        })
          .then(user => {
            res.status(201).json(user);
          })
          .catch(next);
      }
    })
    .catch(next);
});

// request to update details of the user
user_Router.put(
  '/:username',
  userUpdateValidationRules(),
  validate,
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    User.findOneAndUpdate(
      { username: req.params.username },
      {
        $set: {
          username: req.body.username,
          password: req.body.password,
          email: req.body.email,
          birthdate: req.body.birthdate
        }
      },
      { new: true } // to ensure updated document is returned
    )
      .then(updatedUser => {
        if (updatedUser) {
          console.log(updatedUser);
          res.status(200).send('User details has been updated.');
        } else {
          console.log('no user found to update.');
          res
            .status(400)
            .send(req.params.username + ' not found in database to update.');
        }
      })
      .catch(next);
  }
);

// request to add a movie to the favorite list
user_Router.post(
  '/:username/movies/:movieId',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    User.findOneAndUpdate(
      { username: req.params.username },
      {
        $push: {
          favoriteMovies: req.params.movieId
        }
      },
      { new: true }
    )
      .then(updatedUser => {
        console.log(updatedUser);
        res
          .status(200)
          .send('Favorite movie has been added to the favoritemovieslist.');
      })
      .catch(next);
  }
);

// request to remove a movie from favorite list
user_Router.delete(
  '/:username/movies/:movieId',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    User.findOneAndUpdate(
      { username: req.params.username },
      {
        $pull: {
          favoriteMovies: req.params.movieId
        }
      },
      { new: true }
    )
      .then(updatedUser => {
        console.log(updatedUser);
        res
          .status(200)
          .send('Favorite movie has been removed from the favoritemovieslist.');
      })
      .catch(next);
  }
);

// request to delete a user by id
user_Router.delete(
  '/:username',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    User.findOneAndRemove({ username: req.params.username })
      .then(user => {
        if (!user) {
          res.status(404).send(req.params.username + ' was not found.');
        } else {
          res.status(200).send(req.params.username + ' was deleted.');
        }
      })
      .catch(next);
  }
);
export { user_Router };
