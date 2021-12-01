import express from 'express';

const director_Router = express.Router();

import { Movie } from '../models/movie.js';

// import passport module and passport.js file
import passport from 'passport';
import '../js/passport.js';

// request to return details of a director by name
director_Router.get(
  '/:name',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    Movie.findOne({ 'director.name': req.params.name })
      .then(movie => {
        if (movie) {
          console.log(req.params.name + ' director found');
          res.json(movie.director);
        } else {
          console.log(req.params.name + ' director not found');
          res
            .status(404)
            .send('Director details for ' + req.params.name + ' not found');
        }
      })
      .catch(next);
  }
);
export { director_Router };
