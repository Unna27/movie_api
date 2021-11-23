const mongoose = require('mongoose'),
  bcrypt = require('bcrypt');

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

userSchema.statics.hashPassword = password => {
  return bcrypt.hashSync(password, 10);
};

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password); // use regular fn expression, so that this refers to the object from ehich thi fn is being called, else (arrow exor) it refers to the obj where this function is defined.
};

const Movie = mongoose.model('Movie', movieSchema, 'movies');
const User = mongoose.model('User', userSchema, 'users');

module.exports.Movie = Movie;
module.exports.User = User;
