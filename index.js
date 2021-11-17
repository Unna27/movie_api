// load express and morgan framework
const express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  uuid = require('uuid'), // for unique identification number generation
  mongoose = require('mongoose');

const app = express();

// load ModelsScheme
const Models = require('./models.js');
const Movies = Models.Movie;
const Users = Models.User;

// Connect to Mongodb
mongoose.connect('mongodb://localhost:27017/myFlixDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// use morgan framework to use logging function
app.use(morgan('common'));
app.use(bodyParser.json());
//serve static files in public folder
app.use(express.static('public'));

// use http method GET to send response
app.get('/', (req, res) => {
  res.send('Welcome to my Movie API!');
});

/*
app.get("/documentation", (req, res) => {
res.sendFile("public/documentation.html", {
root: __dirname
});
});
*/
// request to return a list of all movies
app.get('/movies', (req, res) => {
  Movies.find()
    .then(movies => {
      res.json(movies);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send('Error: ' + error);
    });
});

// request to return details of a single movie by its title
app.get('/movies/:title', (req, res) => {
  Movies.findOne({ title: req.params.title })
    .then(movie => {
      res.json(movie);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send('Error: ' + error);
    });
});

// request to return general description of a single movie by its title
app.get('/movies/:title/genre', (req, res) => {
  Movies.findOne({ title: req.params.title })
    .then(movie => {
      if (movie) {
        console.log(req.params.title + ' movie found');
        //let genre = Object.values(movie.genres); //Object.values() filters out object's keys and keeps the values alone returned as a new array
        res
          .status(201)
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
    .catch(error => {
      console.log(error);
      res.status(500).send('Error: ' + error);
    });
});

// request to return details of a director by name
app.get('/directors/:name', (req, res) => {
  Movies.findOne({ 'director.name': req.params.name })
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
    .catch(error => {
      console.log(error);
      res.status(500).send('Error: ' + error);
    });
});

// request to add a new user
app.post('/users', (req, res) => {
  if (!req.body.username | !req.body.password | !req.body.email) {
    const message =
      'Missing input paramaeter arguments(name/ password/ email) in request body';
    res.status(400).send(message);
  } else {
    Users.findOne({ username: req.body.username })
      .then(user => {
        if (user) {
          res.status(400).send(req.body.username + ' already exists');
        } else {
          Users.create({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            birthdate: req.body.birthdate
          })
            .then(user => {
              res.status(201).json(user);
            })
            .catch(error => {
              console.log(error);
              res.status(500).send('Error: ' + error);
            });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).send('Error: ' + error);
      });
    //newUser.id = uuid.v4();
  }
});

// request to update details of the user
app.put('/users/:username', (req, res) => {
  Users.findOneAndUpdate(
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
      console.log(updatedUser);
      res.status(201).send('User details has been updated.');
    })
    .catch(error => {
      console.log(error);
      res.status(500).send('Error: ' + error);
    });
});

// request to add a movie to the favorite list
app.post('/users/:username/movies/:movieId', (req, res) => {
  Users.findOneAndUpdate(
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
        .status(201)
        .send('Favorite movie has been added to the favoritemovieslist.');
    })
    .catch(error => {
      console.log(error);
      res.status(500).send('Error: ' + error);
    });
});

// request to remove a movie from favorite list
app.delete('/users/:username/movies/:movieId', (req, res) => {
  Users.findOneAndUpdate(
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
        .status(201)
        .send('Favorite movie has been removed from the favoritemovieslist.');
    })
    .catch(error => {
      console.log(error);
      res.status(500).send('Error: ' + error);
    });
});

// request to delete a user by id
app.delete('/users/:username', (req, res) => {
  Users.findOneAndRemove({ username: req.params.username })
    .then(user => {
      if (!user) {
        res.status(400).send(req.params.username + ' was not found.');
      } else {
        res.status(200).send(req.params.username + ' was deleted.');
      }
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// make the app listen at port 8080
app.listen(8080, () => {
  console.log('Movie_API app listening on port 8080.');
});
