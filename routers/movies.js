import express from 'express';
import { Movie } from '../models/movie.js'; // import moviemodel
import passport from 'passport';
import '../js/passport.js';

const movie_Router = express.Router();
// passport.authenticate('jwt', { session: false }),

movie_Router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    Movie.find()
      .then(movies => {
        res.json(movies);
      })
      .catch(next);
  }
);

// request to return details of a single movie by its title
movie_Router.get(
  '/:title',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    Movie.findOne({ title: req.params.title })
      .then(movie => {
        res.json(movie);
      })
      .catch(next);
  }
);

// request to return general description of a single movie by its title
movie_Router.get(
  '/:title/genre',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    Movie.findOne({ title: req.params.title })
      .then(movie => {
        if (movie) {
          console.log(req.params.title + ' movie found');
          res
            .status(200)
            .send(
              'General Description of the movie ' +
                req.params.title +
                ': ' +
                movie.genres.name +
                '\n' +
                movie.genres.description
            );
        } else {
          console.log(req.params.title + 'movie not found');
          res
            .status(404)
            .send('Movie with the title ' + req.params.title + 'was not found');
        }
      })
      .catch(next);
  }
);
/**
 *  end point that belongs to movie route
 *  @exports movie route
 */

export { movie_Router };
