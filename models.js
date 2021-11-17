const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  genres: {
    name: String,
    description: String
  },
  director: {
    name: String,
    bio: String,
    birthDate: Date,
    deathDate: Date
  },
  imageURL: String,
  featured: Boolean,
  rating: Number,
  releaseDate: Date,
  language: String,
  runtime: String,
  cast: [String]
});

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  birthdate: Date,
  favoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
});

const Movie = mongoose.model('Movie', movieSchema, 'movies');
const User = mongoose.model('User', userSchema, 'users');

module.exports.Movie = Movie;
module.exports.User = User;
